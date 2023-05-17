from flask import Flask, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import db, User, Playlist, Song, Artist, playlist_songs

class SignUp(Resource):
    def get(self):
        pass

api.add_resource(SignUp, '/signup')