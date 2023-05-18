from flask import request, session, jsonify, make_response, render_template
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS

from config import app, db
from models import User, Playlist, Song, Artist, playlist_songs

api = Api(app)

CORS(app)

@app.route('/')
def index():
    return '<h1>Welcome to my page!</h1>'

@app.route('/users', methods=['GET'])
def users():
    response_dict = {
        "text": "Users will go here"
    }
    return make_response(jsonify(response_dict), 200)

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        image_url = request_json.get('image_url')

        user = User(
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

api.add_resource(Signup, '/signup', endpoint='signup')