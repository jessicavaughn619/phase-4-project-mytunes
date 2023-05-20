import React from 'react'

const Playlist = ({playlist}) => {
    const { name } = playlist;
  return (
    <div>{name}</div>
  )
}

export default Playlist;