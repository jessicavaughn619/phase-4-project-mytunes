import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import { Routes, Route, Link } from "react-router-dom";
import './stylesheets/App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [artists, setArtists] =  useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

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
    if (!showFiltered) {
    fetch("/music")
    .then(res => res.json())
    .then(artists => setArtists(artists))}
  }, [showFiltered])

  useEffect(() => {
    fetch("/playlists")
    .then(res => res.json())
    .then(playlists => setPlaylists(playlists))
  }, [])

  function handleSetArtist(id) {
    const filteredArtist = artists.filter(artist => (artist.id === id));
    if (!showFiltered) {
      setShowFiltered(showFiltered => !showFiltered);
    }
    else {
      setShowFiltered(showFiltered => !showFiltered);
      setArtists(filteredArtist);
  }};

  return (
    <div id="app-container-wrapper">
    {user ? 
    <Routes>
      <Route exact path='/' element={<Home
        user={user} 
        onSetUser={setUser} 
        users={users} 
        artists={artists} 
        playlists={playlists}
        onSetArtist={handleSetArtist}
        />}>
      </Route>
    </Routes>
      :
      <>
      <div className="no-session-landing">
        <h1>Welcome to MyTunes!</h1>
        <div className="links">
        <Link to='/signup' className="link">Sign Up</Link>
        <Link to='/login' className="link">Login</Link>
        </div>
        </div>
      <Routes>
        <Route path='/signup' element={<SignUpForm onLogin={setUser}/>}>
        </Route>
        <Route path='/login' element={<LoginForm onLogin={setUser}/>}>
        </Route>
      </Routes>
      </>
    }
    <Footer />
    </div>
  )
}

export default App;
