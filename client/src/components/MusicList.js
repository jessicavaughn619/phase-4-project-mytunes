import React from 'react';
import Artist from './Artist';
import "../stylesheets/MusicList.scss";

const MusicList = ({ artists }) => {

  const allArtists = artists.map((artist) => (
    <Artist
        key={artist.id}
        artist={artist}
    /> ))

  return (
    <div id="musiclist-container-wrapper">
        <h2>Artists</h2>
        {allArtists}
    </div>
  )
}

export default MusicList;
