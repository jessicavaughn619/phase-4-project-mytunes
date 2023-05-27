import React from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({playlist, onSetSelectedPlaylist, selectedPlaylist}) => {
    const { name, id } = playlist;

    function handleClick() {
      console.log(id)
      console.log(selectedPlaylist)
      onSetSelectedPlaylist()
    }

  return (
    <div className="playlist-names" onClick={handleClick}>
      {name}
    </div>
  )
}

export default PlaylistCard;