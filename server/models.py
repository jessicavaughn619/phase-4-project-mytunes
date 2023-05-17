from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

playlist_songs = db.Table('playlist_songs',
                          db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id')),
                          db.Column('song_id', db.Integer, db.ForeignKey('songs.id')))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-playlists.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)

    playlists = db.relationship('Playlist', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"

    serialize_rules = ('-songs.artist', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    songs = db.relationship('Song', backref='artist')

    def __repr__(self):
        return f'<Artist ID: {self.id} | Name: {self.name}>'
    
class Song(db.Model, SerializerMixin):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    def __repr__(self):
        return f'<Song ID: {self.id} | Name: {self.name} | Genre: {self.genre}>'
    
class Playlist(db.Model, SerializerMixin):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    songs = db.relationship('Playlist', secondary=playlist_songs, backref='playlists')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Playlist ID: {self.id} | Name: {self.name}>'