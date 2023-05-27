from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-playlists.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
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
    spotify_id = db.Column(db.String, nullable=False, unique=True)
    image_url = db.Column(db.String)
    genres = db.Column(db.String)

    songs = db.relationship('Song', backref='artist')

    def __repr__(self):
        return f'<Artist ID: {self.id} | Name: {self.name} | Spotify ID: {self.spotify_id}>'
    
class Song(db.Model, SerializerMixin):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    artist_name = db.Column(db.String, nullable=False)
    album = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    artist_id = db.Column(db.String, db.ForeignKey('artists.spotify_id'))

    def __repr__(self):
        return f'<Song ID: {self.id} | Name: {self.name} | Artist: {self.artist} | Album: {self.album} | Genre: {self.genre} | Spotify ID: {self.spotify_id}>'
    
class Playlist(db.Model, SerializerMixin):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Playlist ID: {self.id} | Name: {self.name}>'
    
class PlaylistSong(db.Model, SerializerMixin):
    __tablename__ = 'playlistsongs'

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), primary_key=True)

    def __repr__(self):
        return f'<Playlist ID: {self.playlist_id} | Song ID: {self.song_id}>'