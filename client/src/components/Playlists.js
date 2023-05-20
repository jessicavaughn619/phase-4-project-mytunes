import React from 'react';

const Playlists = ({ users }) => {
    const myPlaylists = users.map((user) => {
        return <li>{user.playlists}</li>
    })
    
  return (
    <div id="playlists-container-wrapper">
        {myPlaylists}
    </div>
  )
}

export default Playlists;