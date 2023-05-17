import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
export const Signup = () => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        fetch("/users")
        .then((r) => r.json())
        .then((data) => setUsers(data))
    })
    return (
        <div>
            <h1>Sign Up for MyTunes</h1>
            <form>
                <input
                id="username"></input>
            </form>
        </div>
    )
}