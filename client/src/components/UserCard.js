import React from 'react';
import "../stylesheets/UserCard.scss";

function UserCard({ user }) {
    const { username, image_url } = user;

  return (
    <div id="user-card">
        <div className="username">
            {username}
        </div>
        <div classname="image">
            <img src={image_url} alt={username}/>
        </div>
    </div>
  )
}

export default UserCard;