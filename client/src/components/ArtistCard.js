import React from 'react';
import '../stylesheets/ArtistCard.scss';

const ArtistCard = ({ artist, onSetArtist }) => {

  const { name, image_url, id } = artist;

  function handleClick() {
    onSetArtist(id)
  }

  return (
    <div onClick={handleClick} className="artist-card">
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