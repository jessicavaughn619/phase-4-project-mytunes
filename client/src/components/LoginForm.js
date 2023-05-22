import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../stylesheets/LoginForm.scss';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
      <div id="login-container-wrapper">
      <h2>Login to MyTunes</h2>
        <form onSubmit={handleSubmit}>
          <div id="username-input">
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div id="submit-button">
              <button variant="fill" color="primary" type="submit">
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <div id="errors">
              {errors.error}
            </div>
        </form>
      </div>
    );
  }
  
  export default LoginForm;