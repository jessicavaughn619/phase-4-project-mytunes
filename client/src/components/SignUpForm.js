import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../stylesheets/SignUpForm.scss';

function SignUpForm({ onLogin }) {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required").min(6, "Username must be at least 6 characters long").max(15, "Username cannot be longer than 15 characters"),
    password: yup.string().required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .test("no-username-match", "Password should not be similar to username", function (value) {
      const { username } = this.parent;
      return !value.toLowerCase().includes(username.toLowerCase());
    }),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        setErrors([]);
        setIsLoading(true);

        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        if (response.ok) {
          const user = await response.json();
          onLogin(user);
          navigate("/");
        } else {
          const errorData = await response.json();
          setErrors(errorData);
        }
      } catch (error) {
        console.error("An error occurred during signup.", error);
        setErrors([{message: "An error occurred during signup."}]);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div id="signupform-container-wrapper">
    <h2>Register for MyTunes</h2>
      <form onSubmit={formik.handleSubmit}>
      <div id="firstname-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
        </div>
        <div id="lastname-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}
        </div>
        <div id="username_input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
          <div className="error">{formik.errors.username}</div>
        )}
        </div>
        <div id="password-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
        </div>
        <div id="password-confirmation-input">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
          />
          {formik.errors.passwordConfirmation && (
          <div className="error">{formik.errors.passwordConfirmation}</div>
        )}
          </div>
        <div id="submit-button">
          <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        </div>
          <div id="errors">
            {errors.error}
          </div>
      </form>
    </div>
  );
}

export default SignUpForm;