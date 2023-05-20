import React from 'react';
import Playlist from './Playlist';

const Playlists = ({ users, playlists }) => {
    const allPlaylists = playlists.map((playlist) => (
        <Playlist 
        key={playlist.id}
        playlist={playlist}/>
    ))
console.log(users)

  return (
    <div id="playlists-container-wrapper">
        <h2>All Playlists</h2>
        {allPlaylists}
    </div>
  )
}

export default Playlists;