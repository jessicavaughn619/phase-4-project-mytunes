import React, { useState } from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({ playlist, onDeletePlaylist }) => {
    const { name, songs, id } = playlist;
    const [isClickedPlaylist, setIsClickedPlaylist] = useState(false)

    function handleClick() {
      setIsClickedPlaylist(isClickedPlaylist => !isClickedPlaylist)
    }

    function handleDeleteClick() {
      onDeletePlaylist(id)
    }

  return (
    <div className="playlist-names">
        <div className="name">
          <h3>{name}</h3>
          <h3 id="expand-collapse" onClick={handleClick}>{isClickedPlaylist ? "-" : "+"}</h3> 
        </div>   
          {isClickedPlaylist ?
          <div>
          <ul>
            {songs.map((song) => (
              <div>
                <p>{song.name} - {song.artist_name}</p>
              </div>))}
          </ul>
        <div className="playlist-options">
          <p className="edit">Edit Playlist</p>
          <p className="delete" onClick={handleDeleteClick} id={id}>Delete Playlist</p>
        </div>
        </div>
      : null }
    </div>
  )
}

export default PlaylistCard;