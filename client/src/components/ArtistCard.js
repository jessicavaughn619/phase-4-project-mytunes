import React from 'react';
import '../stylesheets/ArtistCard.scss';

const ArtistCard = ({artist}) => {
    const { name, songs } = artist;

  return (
    <div id="artist-card">
        <div className="name">
            {name}
        </div>
        <div className="songs">
            {songs}
        </div>
    </div>
  )
}

export default ArtistCard;