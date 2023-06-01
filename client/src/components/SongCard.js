import React from "react";
import '../stylesheets/SongCard.scss'

const SongCard = ({ song, onAddToPlaylist }) => {
    const { name, artist_name, image_url, id } = song;
    const nameLimit = (name.substring(0, 20)) + (name.length > 20 ? "..." : "")

    function handleClick() {
        onAddToPlaylist(id);
    }

    return (
    <div className="song-card">
        <div onClick={handleClick} className="image-song">
            <img src={image_url} alt={name}/>
            <div className="overlay">
                <span className="icon">+</span>
            </div>
        </div>
        <div className="name">
            {nameLimit} -
        </div>
        <div className="artist">
            {artist_name}
        </div>
    </div>
    )
}

export default SongCard;