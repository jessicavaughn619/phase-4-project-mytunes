import React from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({playlist, onSetSelectedPlaylist, selectedPlaylist}) => {
    const { name, id, user_id } = playlist;

    function handleClick() {
      onSetSelectedPlaylist(id);
      console.log(user_id)
    }

  return (
    <div className="playlist-names" onClick={handleClick}>
      {name}
    </div>
  )
}

export default PlaylistCard;