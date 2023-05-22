import React from 'react'
import '../stylesheets/PlaylistCard.scss';

const PlaylistCard = ({playlist}) => {
    const { name } = playlist;
  return (
    <div>{name}</div>
  )
}

export default PlaylistCard;