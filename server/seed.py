from random import choice as rc
from faker import Faker
from config import db, app
import requests
import json
from models import User, Song, Artist, Playlist

fake = Faker()

with app.app_context():
    print('Deleting existing data...')
    User.query.delete()
    Song.query.delete()
    Artist.query.delete()
    Playlist.query.delete()

    def retrieve_playlist_tracks():
        access_token = "BQCQsfQ5roL5RhHqp70fvgoYlaOAoWgDoVilRjtOImI2nMcvS-QbrkmCRMLsbVQcjyxBZCrFy-xL5v22OjbcL8Waig5HKWuZmN87MQPtRor46GdVtmE"
        playlist_id = '37i9dQZF1DXadOVCgGhS7j'

        headers = {
            "Authorization": f'Bearer {access_token}'
        }

        api_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

        response = requests.get(api_url, headers=headers)
        data = response.json()

        tracks = []

        if "items" in data and len(data["items"]) > 0:
            for item in data["items"]:
                track_info = item["track"]
                track = Song(
                    name=track_info["name"],
                    artist_name=track_info["artists"][0]["name"],
                    album=track_info["album"]["name"], 
                    image_url=track_info["album"]["images"][0]["url"],
                )
                tracks.append(track)    
            db.session.add_all(tracks)   

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

    # print('Creating new artists...')
    # artists = []
    # for n in range(20):
    #     artist = Artist(
    #         name=fake.name()
    #     )
    #     artists.append(artist)
    # db.session.add_all(artists)

    # print('Creating new songs...')
    # songs = []
    # for track in tracks:
    #     song = Song(
    #         name=track.name,
    #         artist=track.artist,
    #         album=track.album,

    #     )
    #     songs.append(song)
    # db.session.add_all(songs)

    # print('Creating new playlists...')
    # names = ["Jams", "Favorite Tunes", "Great Songs", "My Faves"]
    # playlists = []
    # for n in range(5):
    #     playlist = Playlist(
    #         name=rc(names),
    #     )
    #     playlists.append(playlist)
    # db.session.add_all(playlists)
    retrieve_playlist_tracks()
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

