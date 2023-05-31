import os
from faker import Faker
from config import db, app
import requests
import random
from random import choice as rc
from models import Song, Artist, User, Playlist, playlist_song

fake = Faker()

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
        "Authorization": "Bearer BQB0Y5RIuTzZ_hJRgUjmWGsvrNueSZ0F6FXXb007SCKCy4lpUt7HWVL7bfjxXOqC0GyDMRPQSogOgl76Uy8dz-OWrFWofRaKYRydi-wz5xOg5qQPlc4"
    }
    response = requests.get(url, headers=headers)
    data = response.json()

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
        songs = Song.query.all()
        for n in range(5):
            playlist = Playlist(
                name=rc(names),
                songs=random.sample(songs, 5)
            )
            playlists.append(playlist)
        db.session.add_all(playlists)
        db.session.commit()


    get_artist_data()
    create_song_instances()
    create_users()
    create_playlists()
    
    db.session.commit()

    print('Complete!')

