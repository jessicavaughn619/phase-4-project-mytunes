import React from "react";
import UserList from "./UserList";
import NavBar from "./NavBar";
import "../stylesheets/Home.scss";
import MusicList from "./MusicList";

function Home({ users }) {
    return (
        <div id="home-container-wrapper">
            <div id="nav-container-wrapper">
                <NavBar users={users}/>
            </div>
            <div id="music-container-wrapper">
                <MusicList />
            </div>
            <div id="user-container-wrapper">
                <UserList users={users}/>
            </div>
        </div>
    )
}

export default Home;
