import React from "react";
import UserList from "./UserList";
import "../stylesheets/Home.scss";

function Home({ users }) {
    return (
        <div id="home-container-wrapper">
            <div id="nav-container-wrapper">
                Nav
            </div>
            <div id="music-container-wrapper">
                Music
            </div>
            <div id="user-container-wrapper">
                <UserList users={users}/>
            </div>
        </div>
    )
}

export default Home;
