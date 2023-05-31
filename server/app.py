from flask import request, session, jsonify, make_response
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from config import app, db
from models import User, Artist, Playlist, Song

api = Api(app)

@app.route('/')
def index():
    return '<h1>Back End Development</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
class Music(Resource):
    def get(self):
        music = [artist.to_dict() for artist in Artist.query.all()]
        return make_response(jsonify(music), 200)
    
class Playlists(Resource):
    def get(self):
        playlists = [playlist.to_dict() for playlist in Playlist.query.all()]
        return make_response(jsonify(playlists), 200)
    
    def post(self):
        request_json = request.get_json()

        name = request_json.get('name')

        new_playlist = Playlist(
            name=name,
            user_id=session['user_id'],
        )

        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict(), 201

class PlaylistByID(Resource):
    def delete(self, id):
        playlist = Playlist.query.filter_by(id=id).first()
        if playlist:
            db.session.delete(playlist)
            db.session.commit()
            return {"message": "Playlist deleted successfully."}, 204
        else: 
            return {"error": "Playlist not found."}, 404

class PlaylistSong(Resource):
    def post(self, id):

        request_json = request.get_json()
        song_id = request_json.get('song_id')

        try:
            playlist = Playlist.query.filter_by(id=id).first()
            song = Song.query.filter_by(id=song_id).first()

            playlist.songs.append(song)
            db.session.commit()
            return song.to_dict(), 201
        
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
    
class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        first_name = request_json.get('first_name')
        last_name= request_json.get('last_name')
        username = request_json.get('username')
        password = request_json.get('password')
        image_url = request_json.get('image_url')

        user = User(
            first_name=first_name,
            last_name=last_name,
            username=username,
            image_url=image_url
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
            return {'error': 'Incorrect password.'}, 401

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Music, '/music', endpoint='music')
api.add_resource(Playlists, '/playlists', endpoint='playlists')
api.add_resource(PlaylistByID, '/playlists/<int:id>')
api.add_resource(PlaylistSong, '/playlists/<int:id>/songs', endpoint='playlist_song')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')