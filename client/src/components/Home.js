import React from "react";
import NavBar from "./NavBar";
import Playlists from "./Playlists";
import MusicList from "./MusicList";
import "../stylesheets/Home.scss";

function Home({ user, onSetUser, artists, playlists, 
    onSetArtist, isLoading, onAddToPlaylist, 
    onSetSelectedPlaylist, selectedPlaylist, isClicked, 
    selectedSong, onSetIsClicked }) {
    return (
        <div id="home-container-wrapper">
            <div id="content-container-wrapper">
            <div id="nav-playlist-container-wrapper">
                    <NavBar 
                    user={user} onSetUser={onSetUser}/>
                <div id="playlist-container-wrapper">
                    <Playlists
                    user={user}
                    playlists={playlists}
                    onSetSelectedPlaylist={onSetSelectedPlaylist}
                    selectedPlaylist={selectedPlaylist}
                    isClicked={isClicked}
                    selectedSong={selectedSong}
                    onSetIsClicked={onSetIsClicked}
                    />
                </div>
                </div>
                    <MusicList 
                    artists={artists}
                    onSetArtist={onSetArtist}
                    isLoading={isLoading}
                    onAddToPlaylist={onAddToPlaylist}
                    />
            </div>
        </div>
    )
}

export default Home;
