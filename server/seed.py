from random import choice as rc
from faker import Faker
from config import db, app
from models import User, Song, Artist, Playlist

fake = Faker()

with app.app_context():
    print('Deleting existing data...')
    User.query.delete()
    Song.query.delete()
    Artist.query.delete()
    Playlist.query.delete()

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

    print('Creating new artists...')
    artists = []
    for n in range(20):
        artist = Artist(
            name=fake.name()
        )
        artists.append(artist)
    db.session.add_all(artists)

    print('Creating new songs...')
    genres = ["Rock", "Pop", "Country", "R&B", "Hip-Hop", "Rap", "EDM", "Acoustic", "Indie"]
    songs = []
    for n in range(50):
        song = Song(
            name=fake.first_name(),
            genre=rc(genres),
        )
        songs.append(song)
    db.session.add_all(songs)

    print('Creating new playlists...')
    playlists = []
    for n in range(10):
        playlist = Playlist(
            name=fake.first_name(),
        )
        playlists.append(playlist)
    db.session.add_all(playlists)
    
    db.session.commit()
    
    # print('Relating records...')
    # def relate_records(users, artists, songs, playlists):
    #     for user in users:
    #         user.playlists = rc(playlists)
    #     for artist in artists:
    #         artist.songs = rc(songs)
    #     for song in songs:
    #         song.artist_id = rc(artists.id)
    #     for playlist in playlists:
    #         playlist.user_id = rc(users.id)
    #     db.session.add_all(users, artists, songs, playlists)
    # relate_records(users, artists, songs, playlists)

    # db.session.commit()
    print('Complete!')