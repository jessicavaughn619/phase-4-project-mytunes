import React from "react";
import '../stylesheets/SongCard.scss'

const SongCard = ({song}) => {
    const { name, artist_name, image_url } = song;

    return (
    <div id="song-card">
        <div className="image">
            <img src={image_url} alt={name}/>
        </div>
        <div className="name">
            {name}
        </div>
        <div className="artist">
            {artist_name}
        </div>
        <button>+</button>
    </div>
    )
}

export default SongCard;