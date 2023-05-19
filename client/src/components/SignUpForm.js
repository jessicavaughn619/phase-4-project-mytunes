import React, { useState } from "react";
import '../stylesheets/SignUpForm.scss';

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

  return (
    <div id="signupform-container-wrapper">
    <h2>New to MyTunes? Sign up here!</h2>
      <form onSubmit={handleSubmit}>
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