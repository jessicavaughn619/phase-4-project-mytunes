import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';
import NewPlaylistForm from './NewPlaylistForm';
import '../stylesheets/Playlists.scss';

const Playlists = ({ isLoading, user, playlists, onSetSelectedPlaylist, 
  selectedPlaylist, isClicked, selectedSong, onSetIsClicked, onAddNewPlaylist, 
  onDeletePlaylist, onAddSong, onDeleteSong, isDeletedSong, isDeletedPlaylist, onEditPlaylistName }) => {
    
    const [playlistForm, setPlaylistForm] = useState(false);
    const [isAddedPlaylist, setIsAddedPlaylist] = useState(false);
    const [isAddedSong, setIsAddedSong] = useState(false);

    const selectPlaylists = playlists.filter((playlist) => (playlist.user_id === user.id))

    const myPlaylists = selectPlaylists.map((playlist) => (
      <PlaylistCard
      key={playlist.id}
      playlist={playlist}
      onDeletePlaylist={onDeletePlaylist}
      onDeleteSong={onDeleteSong}
      onEditPlaylistName={onEditPlaylistName}
      onSetPlaylistForm={setPlaylistForm}
      />
    ))

    function handleCloseClick() {
      onSetIsClicked(false)
    }

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
        <div className="new-song-container"> 
        <form onSubmit={handleSubmit} className="song-form">
          <p className="song-form-close" onClick={handleCloseClick}>X Close</p>
          <p>Add Song to Playlist:</p>
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
        </form></div> : null}
        <div className="new-playlist-container">
          <p id="create-playlist" onClick={handleClick}>{playlistForm ? "X Close" : "+ New Playlist"}</p>
          {playlistForm ? 
          <NewPlaylistForm 
          onIsAddedPlaylist={handleSetIsAddedPlaylist}
          onAddNewPlaylist={onAddNewPlaylist}
          onPlaylistForm={setPlaylistForm}/> : null}
        </div>
        {myPlaylists}
        </div>
    }
    </div>
    </>
  )
}

export default Playlists;