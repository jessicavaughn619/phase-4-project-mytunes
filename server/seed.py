import os
from faker import Faker
from config import db, app
import requests
import random
from random import choice as rc
from models import Song, Artist, User, Playlist, PlaylistSong

fake = Faker()

with app.app_context():

    playlists = []
    users = []
    songs = []
    playlist_songs = []

    print('Deleting existing data...')
    Song.query.delete()
    Artist.query.delete()
    User.query.delete()
    Playlist.query.delete()
    PlaylistSong.query.delete()

    # Get artist ids from single playlist
    url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXadOVCgGhS7j/tracks"
    headers = {
        "Authorization": "Bearer BQDk7EQ_3CeJdf-lMUCAAdleOVHxcIndvhEixA38jPP0DEVw7aFtOZ-EJw4XQDoO8u6l9G1PoSEcAWgSYGhNgCg9nJ7-4XrTILWJNnmwPGiv3yDgPw8"
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
        for n in range(10):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=fake.user_name(),
                image_url=fake.image_url(100, 100)
                )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()
    
    def create_playlists():
        print('Creating new playlists...')
        names = ["Jams", "Favorite Tunes", "Great Songs", "My Faves"]
        for n in range(5):
            playlist = Playlist(
                name=rc(names),
            )
            playlists.append(playlist)
        db.session.add_all(playlists)
        db.session.commit()

    def seed_playlist_songs(playlists, songs, num_songs):
        print('Creating playlist to songs relationships...')
        for playlist in playlists:
            playlist_id = playlist.id
            selected_songs = random.sample(songs, num_songs)
            for song in selected_songs:
                song_id = song.id
                playlist_songs.append(PlaylistSong(playlist_id=playlist_id, song_id=song_id))
            db.session.add_all(playlist_songs)
            db.session.commit()

    get_artist_data()
    create_song_instances()
    create_users()
    create_playlists()
    seed_playlist_songs(playlists, songs, 3)
    
    db.session.commit()

    print('Complete!')

