import React from "react";
import { Link } from "react-router-dom";
import Playlists from "./Playlists";
import '../stylesheets/NavBar.scss'

function NavBar({ user, setUser, playlists }) {
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
        <Playlists 
        user={user}
        playlists={playlists}/>
    </div>
   </div>
)
}

export default NavBar;