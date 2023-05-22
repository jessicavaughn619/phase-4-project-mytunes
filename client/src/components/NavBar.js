import React from "react";
import { Link } from "react-router-dom";
import '../stylesheets/NavBar.scss'

function NavBar({ setUser }) {
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
   </div>
)
}

export default NavBar;