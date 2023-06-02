import os
from config import db, app
import requests
from models import Song, Artist, User, Playlist, playlist_song

with app.app_context():

    playlists = []
    users = []
    songs = []

    print('Deleting existing data...')
    db.session.query(playlist_song).delete()
    db.session.commit()

    Playlist.query.delete()
    db.session.commit()

    Song.query.delete()
    db.session.commit()

    Artist.query.delete()
    db.session.commit()

    User.query.delete()
    db.session.commit()

    url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXadOVCgGhS7j/tracks"
    headers = {
        "Authorization": os.environ.get('AUTH')
    }
    response = requests.get(url, headers=headers)
    data = response.json()

    first_artist_ids = {track['track']['artists'][0]['id'] for track in data['items']}

    url = "https://api.spotify.com/v1/playlists/37i9dQZF1DX0s5kDXi1oC5/tracks"
    headers = {
        "Authorization": os.environ.get('AUTH')
    }
    response = requests.get(url, headers=headers)
    more_data = response.json()

    second_artist_ids = {track['track']['artists'][0]['id'] for track in more_data['items']}

    combined_ids = first_artist_ids.union(second_artist_ids)

    def get_artist_data():
        artists = []

        print("Creating artist instances...")
        for artist_id in list(combined_ids):
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
        for artist_id in list(combined_ids):
            url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US"
            response = requests.get(url, headers=headers)
            data = response.json()
            artist_name = data['tracks'][0]['artists'][0]['name']
            for track in data['tracks']:
                song = Song(
                    name=track['name'],
                    album=track['album']['name'],
                    artist_name=artist_name,
                    image_url=track["album"]["images"][0]["url"],
                    artist_id=artist_id,
                    spotify_id=track['id']
                )
                songs.append(song)
            db.session.add_all(songs)
        db.session.commit()

    get_artist_data()
    create_song_instances()
    
    db.session.commit()

    print('Complete!')

