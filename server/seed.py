from app import app
from config import db
from models import User, Song, Artist, Playlist

with app.app_context():
    print('Deleting existing data...')
    User.query.delete()
    Song.query.delete()
    Artist.query.delete()
    Playlist.query.delete()
