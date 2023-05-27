import React from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({playlist}) => {
    const { name, id } = playlist;

    function handleClick() {
      console.log(id)
    }

  return (
    <div className="playlist-names" onClick={handleClick}>
      {name}
    </div>
  )
}

export default PlaylistCard;