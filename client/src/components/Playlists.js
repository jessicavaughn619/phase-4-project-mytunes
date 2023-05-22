import React from 'react';
import PlaylistCard from './PlaylistCard';
import '../stylesheets/Playlists.scss';

const Playlists = ({ user, playlists }) => {
    const allPlaylists = playlists.map((playlist) => (
        <PlaylistCard 
        key={playlist.id}
        playlist={playlist}/>
    ))

    const myPlaylists = playlists.filter((playlist) => playlist.user_id === user.id);

  return (
    <div id="playlists-container-wrapper">
        <h2>My Playlists</h2>
        {myPlaylists}
        <h2>All Playlists</h2>
        {allPlaylists}
    </div>
  )
}

export default Playlists;