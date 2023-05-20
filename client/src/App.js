import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import './stylesheets/App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

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

  if (user) return <>
  <LoginForm onLogin={setUser} />
  <SignUpForm onLogin={setUser}/>
  <Footer />
  </>;

  return (
    <>
    <div id="app-container-wrapper">
      <Home user={user} setUser={setUser} users={users}/>
    </div>
    <Footer />
    </>
  )
}

export default App;
