import React from "react";
import '../stylesheets/Footer.scss';

function Footer() {
    const today = new Date().getFullYear();

    return (
        <footer id="footer">
            Made with ❤️ & 🍺
            <br />
            © Jessica Vaughn {today} 
        </footer>
    )
}

export default Footer;