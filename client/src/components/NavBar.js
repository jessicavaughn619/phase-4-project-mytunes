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
    <p>Welcome, {user.username}!</p>
    <div className="links">
    <Link to="/">Home</Link>
    <Link onClick={handleLogoutClick}>Logout</Link>
    </div>
   </div>
)
}

export default NavBar;