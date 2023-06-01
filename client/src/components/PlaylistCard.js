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
    <div className="playlist-names" onClick={handleClick}>
      {isClickedPlaylist ? 
      <div>
        <div className="name">{name}</div>        
          <ul>
            {songs.map((song) => (
              <p>{song.name} - {song.artist_name}</p>))}
          </ul>
        <p onClick={handleDeleteClick} id={id}>Delete Playlist</p>
        </div>
      : <div className="name">
      {name}</div>}
    </div>
  )
}

export default PlaylistCard;