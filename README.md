# MyTunes

myTunes is a React-Flask full-stack application that allows authenticated users to create unique playlists, add songs from the database, then play their selected songs through the Spotify web application. Each user can deploy full CRUD operations on their own playlists to put together incredible playlists with all their favorite songs.

## Installation

For local installation, fork and clone this repository, then cd into your project folder and run the following commands:

```npm install --prefix client
```

```pipenv install requirements.txt && pipenv shell
```

To run both front and backend applications simultaneously, run the following command:

```honcho start -f Procfile.dev
```

The React front end will be available at localhost:4000; the Flask backend will be available at localhost:5555

## Usage

Create an account by signing up on the Sign Up page. Once signed up, users are redirected to the home page and can see all of the artists, genres, and songs within the API. 

### Playlists

To create a new playlist, click the 'New Playlist' button in the My Playlists navigation bar. After naming the playlist, users can start to add songs to their playlist. Filter through available songs by artist or genre by clicking on the corresponding card. Users can also search for an artist using the search bar at the top of the Artists navigation bar. Once a user finds a song they want to add, click on the song card and choose a playlist from the My Playlists Navigation bar dropdown to add the song to. 

To edit playlists, click the + sign next to the playlist name to expand a playlist. Click the 'Edit Playlist' button at the bottom of the playlist. This opens the playlist editor where a user can remove songs they do not want on their playlist or edit the name of the playlist. Users can also delete playlists by clicking 'Delete Playlist' and confirming the deletion.

To listen to a song, click the + sign next to the playlist name to expand a playlist, then click the music icon next to a song to open a new tab in Spotify.

## Resources

Artist and song data accessed through the Spotify API: [Spotify Developer API](https://developer.spotify.com/documentation/web-api)
