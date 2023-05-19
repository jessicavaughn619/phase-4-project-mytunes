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
            image_url=fake.image_url()
            )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    print('Complete!')