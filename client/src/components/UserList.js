import React from "react";
import User from "./User";

function UserList({ users }) {

    const allUsers = users.map((user) => (
        <User 
            key={user.id}
            user={user}
        /> ))
    return (
        <div>
        <h2>Users</h2>
            {allUsers}
        </div>
    )
}

export default UserList;