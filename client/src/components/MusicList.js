import React from 'react';
import ArtistCard from './ArtistCard';
import "../stylesheets/MusicList.scss";

const MusicList = ({ artists }) => {

  const allArtists = artists.map((artist) => (
    <ArtistCard
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
