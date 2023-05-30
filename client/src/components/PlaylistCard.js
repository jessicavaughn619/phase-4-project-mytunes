import React, { useState } from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({ playlist }) => {
    const { name, songs } = playlist;
    const [isClickedPlaylist, setIsClickedPlaylist] = useState(false)

    function handleClick() {
      setIsClickedPlaylist(isClickedPlaylist => !isClickedPlaylist)
    }

  return (
    <div className="playlist-names" onClick={handleClick}>
      {name}
      {isClickedPlaylist ? 
        <li>{songs}</li>
      : null}
    </div>
  )
}

export default PlaylistCard;