import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const Signup = () => {
    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        fetch("/users")
        .then((r) => r.json())
        .then((data) => setUsers(data))
    }, [refreshPage]);

    console.log(users)

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.status == 200) {
                    setRefreshPage(!refreshPage);
                }
            });
        },
    });

    return (
        <div>
            <h1>Sign Up for MyTunes</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}