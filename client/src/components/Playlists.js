import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';
import '../stylesheets/Playlists.scss';

const Playlists = ({ isLoading, user, playlists, onSetSelectedPlaylist, 
  selectedPlaylist, isClicked, selectedSong, onSetIsClicked, onAddNewPlaylist, 
  onDeletePlaylist, onAddSong, onDeleteSong, isDeletedSong, isDeletedPlaylist }) => {
    
    const [playlistForm, setPlaylistForm] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [isAddedPlaylist, setIsAddedPlaylist] = useState(false);
    const [isAddedSong, setIsAddedSong] = useState(false);
    
    const selectPlaylists = playlists.filter((playlist) => (playlist.user_id === user.id))

    const myPlaylists = selectPlaylists.map((playlist) => (
      <PlaylistCard
      key={playlist.id}
      playlist={playlist}
      onDeletePlaylist={onDeletePlaylist}
      onDeleteSong={onDeleteSong}
      />
    ))

    function handleSetIsAddedPlaylist() {
      setIsAddedPlaylist(true);
      setTimeout(() => {
        setIsAddedPlaylist(false);
      }, 5000);
    }

    function handleSetIsAddedSong() {
      setIsAddedSong(true);
      setTimeout(() => {
        setIsAddedSong(false);
      }, 5000);
    }

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
          onAddSong(songId, id);
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
        handleSetIsAddedSong()
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
      .finally(() => {
        setPlaylistName("")
        setPlaylistForm(false)
        handleSetIsAddedPlaylist()
      });
    }

  return (
    <>
    <div id="playlists-container-wrapper">
    {isLoading ? <h1>Loading</h1> : 
      <div>
        <h2>My Playlists</h2>
        {isAddedPlaylist ? 
        <div className="confirm">
          <p>Successfully created new playlist!</p>
        </div> : null}
        {isAddedSong ? 
        <div className="confirm">
          <p>Successfully added song to playlist!</p>
        </div> : null}
        {isDeletedSong ? 
        <div className="confirm">
          <p>Successfully deleted song from playlist!</p>
        </div> : null}
        {isDeletedPlaylist ? 
        <div className="confirm">
          <p>Successfully deleted playlist!</p>
        </div> : null}
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