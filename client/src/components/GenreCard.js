import React from 'react';
import "../stylesheets/GenreCard.scss";

const GenreCard = ({ genre, onSetArtist }) => {

  function handleClick() {
    onSetArtist(genre)
  }
  return (
    <div onClick={handleClick} className="genre-card">
        <div className="genre-container">
        {genre}
        </div>
    </div>
  )
}

export default GenreCard;