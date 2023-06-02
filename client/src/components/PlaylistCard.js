import React, { useState } from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({ playlist, onDeletePlaylist, onDeleteSong }) => {
    const { name, songs, id } = playlist;
    const [isClickedPlaylist, setIsClickedPlaylist] = useState(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const [isEditPlaylist, setIsEditPlaylist] = useState(false)

    function handleClick() {
      setIsClickedPlaylist(isClickedPlaylist => !isClickedPlaylist)
    }

    function handleFirstDeleteClick() {
      setIsDeleteClicked(isDeleteClicked => !isDeleteClicked)
    }

    function handleConfirmDeleteClick() {
      onDeletePlaylist(id)
    }

    function handleFirstEditClick() {
      setIsEditPlaylist(isEditPlaylist => !isEditPlaylist)
    }
    
    function handleDeleteSong(e) {
      onDeleteSong(e.target.id, id)
    }

  return (
    <div className="playlist-names">
        <div className="name">
          <h3>{name}</h3>
          <h3 id="expand-collapse" onClick={handleClick}>{isClickedPlaylist ? "-" : "+"}</h3> 
        </div>   
          {isClickedPlaylist ?
          <div>
          <ul className={isEditPlaylist ? "edit-playlist" : "playlist-items"}>
            {songs.map((song) => (
              <div className="edit-container">
                {isEditPlaylist? 
                <div className="track">
                  <p className="delete-song" id={song.id} onClick={handleDeleteSong}>X</p>
                  <p>{song.name} - {song.artist_name}</p>
                </div> :
                <div className="track">
                  <a href={`https://open.spotify.com/track/${song.spotify_id}`} target="_blank" rel="noreferrer">🎵</a>
                  <p>{song.name} - {song.artist_name}</p>
                </div>}
              </div>))}
          </ul>
        <div className="playlist-options">
          <p className="edit" onClick={handleFirstEditClick}>{isEditPlaylist ? "- Close Editer" : "+ Edit Playlist"}</p>
          <p className="delete" onClick={handleFirstDeleteClick} id={id}>X Delete Playlist</p>
        </div>
          {isDeleteClicked ? 
          <div className="delete-confirm">
            <p>Confirm Delete Playlist?</p>
            <p id="yes-delete" onClick={handleConfirmDeleteClick}>Yes</p>
            <p id="no-delete" onClick={handleFirstDeleteClick}>No</p>
          </div>: null}
        </div>
      : null }
    </div>
  )
}

export default PlaylistCard;