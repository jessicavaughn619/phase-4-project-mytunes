import React from "react";
import { Link } from "react-router-dom";
import Playlists from "./Playlists";
import '../stylesheets/NavBar.scss'

function NavBar({ setUser, users }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
          });
        }
return (
  <div id="navbar-container-wrapper">
    <div className="links">
    <Link to="/">Home</Link>
    <Link onClick={handleLogoutClick}>Logout</Link>
    </div>
    <div className="playlists">
      <div className="my-playlists">
        <Playlists users={users}/>
      </div>
      <div className="followed-playlists">
        Following
      </div>
    </div>
   </div>
)
}

export default NavBar;