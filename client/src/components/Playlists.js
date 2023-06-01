import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';
import '../stylesheets/Playlists.scss';

const Playlists = ({ isLoading, user, playlists, onSetSelectedPlaylist, 
  selectedPlaylist, isClicked, selectedSong, onSetIsClicked, onAddNewPlaylist, onDeletePlaylist, onAddSong }) => {
    
    const [playlistForm, setPlaylistForm] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    
    const selectPlaylists = playlists.filter((playlist) => (playlist.user_id === user.id))

    const myPlaylists = selectPlaylists.map((playlist) => (
      <PlaylistCard
      key={playlist.id}
      playlist={playlist}
      onDeletePlaylist={onDeletePlaylist}
      />
    ))

    function handleSubmit(e) {
      e.preventDefault()
      const id = selectedPlaylist;
      const songId = selectedSong;
      const songData = { song_id: selectedSong };
      fetch(`/playlists/${id}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      }).then((r) => {
        if (r.ok) {
          alert("Song added to playlist!");
          onAddSong(songId, id)
        } else {
          throw new Error("Failed to add song to playlist");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add song to playlist");
      })
      .finally(() => {
        onSetIsClicked(false);
        onSetSelectedPlaylist('')
      });
    }

    function handleClick() {
     setPlaylistForm(playlistForm => !playlistForm)
    }
    
    function handleNewPlaylistSubmit(e) {
      e.preventDefault()
      fetch('/playlists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: playlistName, 
        }),
      }).then((r) => r.json())
      .then((newPlaylist) => onAddNewPlaylist(newPlaylist))
      alert("New playlist added!")
      setPlaylistName("")
      setPlaylistForm(false)
    }

  return (
    <>
    <div id="playlists-container-wrapper">
    {isLoading ? <h1>Loading</h1> : 
      <div>
        <h2>My Playlists</h2>
        {isClicked ? 
        <form onSubmit={handleSubmit}>
          <p>+ Song to Playlist:</p>
          <select value={selectedPlaylist} onChange={(e) => onSetSelectedPlaylist(e.target.value)}>
            <option value = "">
              --Select Playlist--
            </option>
            {selectPlaylists.map((playlist, index) => (
            <option value={playlist.id} key={index}>
              {playlist.name}
            </option>))}
          </select>
          <button>Confirm Add Song</button>
        </form> : null}
        <div className="new-playlist-container">
          <p id="create-playlist" onClick={handleClick}>{playlistForm ? "X Close" : "+ New Playlist"}</p>
          {playlistForm ? 
          <form className="new-playlist-form" onSubmit={handleNewPlaylistSubmit}>
            <label htmlFor="playlistName">New Playlist Name:</label>
            <input 
            type="text"
            id="playlistName"
            autoComplete="off"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button>Submit</button>
          </form> : null}
        </div>
        {myPlaylists}
        </div>
    }
    </div>
    </>
  )
}

export default Playlists;