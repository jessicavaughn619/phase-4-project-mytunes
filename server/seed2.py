from config import db, app
from random import choice as rc
from models import Playlist

with app.app_context():
      
    playlists = []

    print('Deleting playlists...')
    Playlist.query.delete()
    
    def create_playlists():
        print('Creating new playlists...')
        names = ["Jams", "Favorite Tunes", "Great Songs", "My Faves"]
        for n in range(5):
            playlist = Playlist(
                name=rc(names),
                user_id=11
            )
            playlists.append(playlist)
        db.session.add_all(playlists)
        db.session.commit()

    create_playlists()
    print('Complete!')