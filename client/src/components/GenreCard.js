import React from 'react';
import "../stylesheets/GenreCard.scss";

const GenreCard = ({ genre, onSetArtist }) => {

  function handleClick() {
    onSetArtist(genre)
  }
  return (
    <div className="genre-card">
        <div onClick={handleClick} className="genre-container">
          <p id="genre-name">{genre}</p>
        </div>
    </div>
  )
}

export default GenreCard;