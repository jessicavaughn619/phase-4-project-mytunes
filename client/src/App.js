import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import './stylesheets/App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [artists, setArtists] =  useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  function handleClick() {
    setShowSignup(showSignUp => !showSignUp);
    setShowLogin(showLogin => !showLogin);
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

  useEffect(() => {
    fetch("/artists")
    .then(res => res.json())
    .then(artists => setArtists(artists))
  }, [])

  return (
    <div id="app-container-wrapper">
    {user ? 
      <Home user={user} setUser={setUser} users={users} artists={artists}/> :
      <>
      {showLogin ? <LoginForm onLogin={setUser} /> : null }
      <div id="signup-button-container">
        <h2>{showSignup ? "Returning User?" : "New to MyTunes?"}</h2>
        <button onClick={handleClick}>{showSignup ? "Login" : "Sign Up"}</button>
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
