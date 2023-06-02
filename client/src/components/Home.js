import React from "react";
import NavBar from "./NavBar";
import Playlists from "./Playlists";
import MusicList from "./MusicList";
import "../stylesheets/Home.scss";

function Home({ user, onSetUser, artists, playlists, 
    onSetArtist, isLoading, onAddToPlaylist, 
    onSetSelectedPlaylist, selectedPlaylist, isClicked, 
    selectedSong, onSetIsClicked, onAddNewPlaylist, onDeletePlaylist, 
    onAddSong, onDeleteSong, isDeletedSong, isDeletedPlaylist }) {

    return (
        <div id="home-container-wrapper">
            <div id="content-container-wrapper">
            <div id="nav-playlist-container-wrapper">
                    <NavBar 
                    user={user} onSetUser={onSetUser}/>
                <div id="playlist-container-wrapper">
                    <Playlists
                    isLoading={isLoading}
                    user={user}
                    playlists={playlists}
                    onSetSelectedPlaylist={onSetSelectedPlaylist}
                    selectedPlaylist={selectedPlaylist}
                    isClicked={isClicked}
                    selectedSong={selectedSong}
                    onSetIsClicked={onSetIsClicked}
                    onAddNewPlaylist={onAddNewPlaylist}
                    onDeletePlaylist={onDeletePlaylist}
                    onAddSong={onAddSong}
                    onDeleteSong={onDeleteSong}
                    isDeletedSong={isDeletedSong}
                    isDeletedPlaylist={isDeletedPlaylist}
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
