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
    <div>
    <button as={Link} to="/">Home</button>
    <button onClick={handleLogoutClick}>Logout</button>
    </div>
)
}

export default NavBar;