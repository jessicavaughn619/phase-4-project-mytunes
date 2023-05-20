import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import './stylesheets/App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  function handleClick() {
    setShowSignup(showSignUp => !showSignUp)
  }

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/users")
    .then(res => res.json())
    .then(users => setUsers(users))
  }, [])

  return (
    <div id="app-container-wrapper">
    {user ? 
      <Home user={user} setUser={setUser} users={users}/> :
      <>
      <LoginForm onLogin={setUser} />
      <div id="signup-button-container">
        <h2>New to MyTunes?</h2>
        <button onClick={handleClick}>{showSignup ? "Close Sign Up Form" : "Sign Up"}</button>
      </div>
      {showSignup ? 
      <SignUpForm onLogin={setUser}/> : null}
      </>
    }
    <Footer />
    </div>
  )
}

export default App;
