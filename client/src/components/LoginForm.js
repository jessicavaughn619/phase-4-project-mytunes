import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
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
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err));
        }
      });
    }

    function handleClick(event) {
      if (event.target.value === "signup") return <SignUpForm />
    }
  
    return (
      <div>
      <p>Login to MyTunes</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
            <div>
              {errors.error}
            </div>
        </form>
      </div>
    );
  }
  
  export default LoginForm;