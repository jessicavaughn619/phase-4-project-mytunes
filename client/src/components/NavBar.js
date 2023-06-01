import React from "react";
import { Link } from "react-router-dom";
import '../stylesheets/NavBar.scss'

function NavBar({ user, onSetUser }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              onSetUser(null);
            }
          });
        }
return (
  <div id="navbar-container-wrapper">
    <p id="welcome">Welcome, {user.username}!</p>
    <div id="links">
      <h3><Link to="/">Home</Link></h3>
      <h3><Link onClick={handleLogoutClick}>Logout</Link></h3>
    </div>
  </div>
)
}

export default NavBar;