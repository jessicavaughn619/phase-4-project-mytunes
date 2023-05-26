from faker import Faker
from random import choice as rc
from config import db, app
from models import User, Playlist    

fake = Faker()

with app.app_context():
    print('Deleting existing user and playlist data...')
    User.query.delete()
    Playlist.query.delete()

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
        db.session.commit()
    
    def create_playlists():
        print('Creating new playlists...')
        names = ["Jams", "Favorite Tunes", "Great Songs", "My Faves"]
        playlists = []
        for n in range(5):
            playlist = Playlist(
                name=rc(names),
            )
            playlists.append(playlist)
        db.session.add_all(playlists)
        db.session.commit()
    
    create_users()
    create_playlists()
    db.session.commit()

    print("Complete!")