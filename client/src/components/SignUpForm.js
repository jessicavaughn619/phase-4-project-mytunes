import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/SignUpForm.scss';

function SignUpForm({ onLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        .then(navigate("/"));
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

  return (
    <div id="signupform-container-wrapper">
    <h2>Register for MyTunes</h2>
      <form onSubmit={handleSubmit}>
      <div id="firstname-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div id="lastname-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div id="username_input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div id="password-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div id="password-confirmation-input">
          <label htmlFor="password">Password Confirmation</label>
          <input
            type="password"
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
          </div>
        <div id="imageurl-input">
          <label htmlFor="imageUrl">Profile Image</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
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