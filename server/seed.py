import os
from faker import Faker
from config import db, app
import requests
from models import User, Song, Artist, Playlist

fake = Faker()

with app.app_context():
    print('Deleting existing data...')
    User.query.delete()
    Song.query.delete()
    Artist.query.delete()
    Playlist.query.delete()

    # Get artist ids from single playlist
    url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXadOVCgGhS7j/tracks"
    headers = {
        os.environ.get('AUTH')
    }
    response = requests.get(url, headers=headers)
    data = response.json()

    # Extract artist Spotify IDs
    artist_ids = {track['track']['artists'][0]['id'] for track in data['items']}

    def get_artist_data():
        artists = []

        print("Creating artist instances...")
        for artist_id in list(artist_ids):
            url = f"https://api.spotify.com/v1/artists/{artist_id}"
            response = requests.get(url, headers=headers)
            data = response.json()
            artist = Artist(
                name=data['name'],
                spotify_id=artist_id,
                image_url=data['images'][0]['url'] if data['images'] else None,
                genres=(data['genres'][0]).title() if data['genres'] else None
            )
            artists.append(artist)
        db.session.add_all(artists)
        db.session.commit()


    def create_song_instances():
        print("Creating song instances...")
        for artist_id in list(artist_ids):
            url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US"
            response = requests.get(url, headers=headers)
            data = response.json()
            artist_name = data['tracks'][0]['artists'][0]['name']
            songs = []
            for track in data['tracks']:
                song = Song(
                    name=track['name'],
                    album=track['album']['name'],
                    artist_name=artist_name,
                    image_url=track["album"]["images"][0]["url"],
                    artist_id=artist_id
                )
                songs.append(song)
            db.session.add_all(songs)
        db.session.commit()

    def create_users():
        print('Creating new users...')
        users = []
        for n in range(10):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=fake.user_name(),
                image_url=fake.image_url(100, 100)
                )
            users.append(user)
        db.session.add_all(users)

    # print('Creating new playlists...')
    # names = ["Jams", "Favorite Tunes", "Great Songs", "My Faves"]
    # playlists = []
    # for n in range(5):
    #     playlist = Playlist(
    #         name=rc(names),
    #     )
    #     playlists.append(playlist)
    # db.session.add_all(playlists)

    get_artist_data()
    create_song_instances()
    create_users()
    db.session.commit()
    
    # print('Relating records...')
    # def relate_records(playlists, songs, users, artists):
    #     for playlist in playlists:
    #         playlist.user_id = rc(users)
    #     db.session.add_all(playlists)
    #     for song in songs:
    #         song.artist_id = rc(artists)
    #     db.session.add_all(songs)
    #     db.session.commit()
    # relate_records(playlists, songs, users, artists)

    print('Complete!')

