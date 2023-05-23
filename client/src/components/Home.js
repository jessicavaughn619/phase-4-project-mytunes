import React from "react";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Playlists from "./Playlists";
import MusicList from "./MusicList";
import "../stylesheets/Home.scss";

function Home({ user, users, onSetUser, artists, playlists, songs }) {
    return (
        <div id="home-container-wrapper">
            <div id="nav-container-wrapper">
                <NavBar 
                user={user} onSetUser={onSetUser}/>
            </div>
            <div id="content-container-wrapper">
                <div id="playlist-container-wrapper">
                    <Playlists
                    user={user}
                    playlists={playlists}/>
                </div>
                <div id="music-container-wrapper">
                    <MusicList 
                    artists={artists}
                    songs={songs}/>
                </div>
                <div id="user-container-wrapper">
                    <UserList 
                    users={users}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
