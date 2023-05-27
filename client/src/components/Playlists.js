import React from 'react';
import PlaylistCard from './PlaylistCard';
import '../stylesheets/Playlists.scss';

const Playlists = ({ user, playlists, onSetSelectedPlaylist, selectedPlaylist, isClicked, onSetIsClicked, selectedSong }) => {
    const allPlaylists = playlists.map((playlist) => (
        <PlaylistCard 
        key={playlist.id}
        playlist={playlist}
        />
    ))

    const myPlaylists = playlists.filter((playlist) => playlist.user_id === user.id);

    function handleSubmit(e) {
      e.preventDefault()
      onSetIsClicked()
      fetch("/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_id: selectedSong,
          playlist_id: selectedPlaylist,
        }),
      }).then((res) => res.json())
      .then((data) => console.log(data))
    }

  return (
    <>
    <div id="playlists-container-wrapper">
        <h2>My Playlists</h2>
        {isClicked ? 
        <form onSubmit={handleSubmit}>
          <p>Select Playlist to Add Song:</p>
          <select value={selectedPlaylist} onChange={(e) => onSetSelectedPlaylist(e.target.value)}>
            <option value = "">
              --Select Playlist--
            </option>
            {myPlaylists.map((playlist, index) => (
            <option value={playlist} key={index}>
              {playlist}
            </option>))}
          </select>
          <button>Confirm Add Song</button>
        </form> : null}
        {myPlaylists}
        <h2>All Playlists</h2>
        {allPlaylists}
    </div>
    </>
  )
}

export default Playlists;