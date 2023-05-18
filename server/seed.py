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
            username=fake.name(),
            image_url="Hello"
            )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    print('Complete!')