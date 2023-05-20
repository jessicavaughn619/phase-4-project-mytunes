import React from 'react';

const Playlists = ({ users }) => {
    const allPlaylists = users.map((user) => {
      if (user.playlist) {
        return <li>{user.playlists}</li>
      }
    })
    
  return (
    <div id="playlists-container-wrapper">
        {allPlaylists}
    </div>
  )
}

export default Playlists;