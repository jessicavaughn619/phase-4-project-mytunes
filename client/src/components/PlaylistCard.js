import React, { useState } from 'react'
import EditPlaylistForm from './EditPlaylistForm';
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({ playlist, onDeletePlaylist, onDeleteSong, 
  onEditPlaylistName, onSetPlaylistForm }) => {
    const { name, songs, id } = playlist;
    const [isClickedPlaylist, setIsClickedPlaylist] = useState(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const [isEditPlaylist, setIsEditPlaylist] = useState(false)
    const [isEditPlaylistName, setIsEditPlaylistName] = useState(false)
    const [editedPlaylist, setEditedPlaylist] = useState({id: null, name: null})
    const [isUpdatedPlaylist, setIsUpdatedPlaylist] = useState(false);
    
    function handleSetIsUpdatedPlaylist() {
      setIsUpdatedPlaylist(true)
      setTimeout(() => {
        setIsUpdatedPlaylist(false);
      }, 3000);
    }

    function handleClick() {
      setIsClickedPlaylist(isClickedPlaylist => !isClickedPlaylist)
      setIsEditPlaylist(false)
      setIsEditPlaylistName(false)
      setEditedPlaylist({id: null, name: null})
      setIsDeleteClicked(false)
    }

    function handleFirstDeleteClick() {
      setIsDeleteClicked(isDeleteClicked => !isDeleteClicked)
      setIsEditPlaylist(false)
      setEditedPlaylist({id: null, name: null})
      setIsEditPlaylistName(false)
    }

    function handleConfirmDeleteClick() {
      onDeletePlaylist(id)
    }

    function handleFirstEditClick() {
      setIsEditPlaylist(isEditPlaylist => !isEditPlaylist)
      setIsDeleteClicked(false)
      setEditedPlaylist({id: null, name: null})
      setIsEditPlaylistName(false)
    }
    
    function handleDeleteSong(e) {
      onDeleteSong(e.target.id, id)
    }

    function handleEditPlaylistNameClick() {
      setIsEditPlaylistName(isEditPlaylistName => !isEditPlaylistName)
      setEditedPlaylist({id: id, name: name})
      onSetPlaylistForm(false)
    }

  return (
    <div className="playlist-names">
        <div className="name">
          {isEditPlaylist ? 
          <div className="edit-playlist-name">
            <h3 id="playlist-name">{name}</h3>
            <h3 id="edit-playlist-pencil" onClick={handleEditPlaylistNameClick}>✏️</h3>
          </div> : <h3>{name}</h3>}
          <h3 id="expand-collapse" onClick={handleClick}>{isClickedPlaylist ? "-" : "+"}</h3> 
        </div>   
        {isUpdatedPlaylist ? 
        <div className="confirm">
          <p>Successfully updated playlist name!</p>
        </div> : null}
        {isEditPlaylistName ? 
          <EditPlaylistForm 
            isEditPlaylistName={isEditPlaylistName}
            editedPlaylist={editedPlaylist}
            onEditPlaylistName={onEditPlaylistName}
            onSetEditedPlaylist={setEditedPlaylist}
            onSetIsUpdatedPlaylist={handleSetIsUpdatedPlaylist}
            onSetIsEditPlaylistName={setIsEditPlaylistName}
            /> : null}
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