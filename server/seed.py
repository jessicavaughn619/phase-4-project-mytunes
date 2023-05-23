from faker import Faker
from config import db, app
import requests
import json
from models import User, Song, Artist, Playlist
import ipdb

fake = Faker()

with app.app_context():
    print('Deleting existing data...')
    User.query.delete()
    Song.query.delete()
    Artist.query.delete()
    Playlist.query.delete()

    def retrieve_tracks_and_artists():
        access_token = "BQB9Rh47C4IoNfFvEfjcLvNw1WUClSe9kQdWGkNUSubU8yaAvDIRCECJz84oJFBggZ1UnZK8ETYVtPO2JBeR-WpgZlVU-O4qhN1mFmzY1Idftq_N-uc"
        playlist_id = '37i9dQZF1DXadOVCgGhS7j'

        headers = {
            "Authorization": f'Bearer {access_token}'
        }

        api_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

        response = requests.get(api_url, headers=headers)
        data = response.json()

        tracks = []

        print("Creating new artist instances...")
        for item in data["items"]:
            track_info = item["track"]
            artists=[]
            for artist_info in track_info["artists"]:
                if len(artists) == 1:
                        artist = Artist(
                            name=artist_info["name"],
                            spotify_id=artist_info["id"]
                        )
                        artists.append(artist)
                else:
                    spotify_id = artist_info["id"]
                    existing_spotify_ids = [a[spotify_id] for a in artists]
                    if spotify_id not in existing_spotify_ids:
                        artist = Artist(
                            name=artist_info["name"],
                            spotify_id=artist_info["id"]
                        )
                        artists.append(artist)
            db.session.add_all(artists)
        
        print("Creating new song instances...")
        if "items" in data and len(data["items"]) > 0:
            for item in data["items"]:
                track_info = item["track"]
                track = Song(
                    name=track_info["name"],
                    artist_name=artists,
                    album=track_info["album"]["name"], 
                    image_url=track_info["album"]["images"][0]["url"]
                )
                tracks.append(track)  
        db.session.add_all(tracks)

    
    # def retrieve_artists():
    #     access_token = "BQDBLMXmaiWm0MsQkBBMmL76IjNH4HspSbPbbL6zOwawKvig-Ic06TqCyLNev3dxsUjOIdXfT4x5le8p3crzREW8D9O0MRqTG3J1WhHjEBSVr5PnRMA"
    #     for track in tracks:
    #         artist_ids = []
    #         artist_id = track.spotify_id

        
    #     artist_ids = 

    #     headers = {
    #         "Authorization": f'Bearer {access_token}'
    #     }

    #     api_url = f'https://api.spotify.com/v1/artists/{artist_ids}'

    #     response = requests.get(api_url, headers=headers)
    #     data = response.json()
        
    #     print("Creating new artist instances...")
    #     for item in data["items"]:
    #         track_info = item["track"]
    #         for artist_info in track_info["artists"]:
    #                 if artist_info["id"] not in artists:
    #                     artist = Artist(
    #                         name=artist_info["name"],
    #                         spotify_id=artist_info["id"]
    #                     )
    #                     artists.append(artist)
    #         db.session.add_all(artists)

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
    retrieve_tracks_and_artists()
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

