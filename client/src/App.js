import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import './stylesheets/App.scss';
import SignUpForm from './components/SignUpForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <>
  <LoginForm onLogin={setUser} />
  <SignUpForm onLogin={setUser}/>
  </>;

  return (
    <>
    <div id="app-container-wrapper">
      <NavBar user={user} setUser={setUser}/>
      <Home />
    </div>
    <Footer />
    </>
  )
}

export default App;
