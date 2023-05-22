import React from "react";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Playlists from "./Playlists";
import "../stylesheets/Home.scss";
import MusicList from "./MusicList";

function Home({ user, users, setUser, artists, playlists }) {
    return (
        <div id="home-container-wrapper">
            <div id="nav-container-wrapper">
                <NavBar 
                user={user} onSetUser={setUser}/>
            </div>
            <div id="content-container-wrapper">
                <div id="playlist-container-wrapper">
                    <Playlists
                    user={user}
                    playlists={playlists}/>
                </div>
                <div id="music-container-wrapper">
                    <MusicList 
                    artists={artists}/>
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
