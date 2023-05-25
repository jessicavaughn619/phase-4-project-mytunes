import React from 'react';
import '../stylesheets/ArtistCard.scss';

const ArtistCard = ({artist}) => {
  const { name, image_url } = artist;

  return (
    <div id="artist-card">
        <div className="image">
          <img src={image_url} alt={name}/>
        </div>
        <div className="name">
            {name}
        </div>
    </div>
  )
}

export default ArtistCard;