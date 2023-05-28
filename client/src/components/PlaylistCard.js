import React, { useState } from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({ playlist, onSetSelectedPlaylist }) => {
    const { name, id, songs } = playlist;
    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
      onSetSelectedPlaylist(id);
      setIsClicked(isClicked => !isClicked)
    }

  return (
    <div className="playlist-names" onClick={handleClick}>
      {name}
      {isClicked ? 
        <li>{songs}</li>
      : null}
    </div>
  )
}

export default PlaylistCard;