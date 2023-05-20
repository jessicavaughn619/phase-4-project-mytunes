import React from "react";
import User from "./User";
import "../stylesheets/UserList.scss";

function UserList({ users }) {

    const allUsers = users.map((user) => (
        <User 
            key={user.id}
            user={user}
        /> ))
    return (
        <div id="userlist-container-wrapper">
        <h2>Users</h2>
            {allUsers}
        </div>
    )
}

export default UserList;