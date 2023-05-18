import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
          <Route path="/">
          </Route>
      </main>
    </>
  )
}

export default App;
