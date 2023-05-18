import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
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

  return (
    <>
    {user ?
    <div>
      <NavBar user={user} setUser={setUser} />
      <Link to="/">Home</Link>
    </div> :
    <div>
      <Link to="/signup" exact component={() => <SignUpForm />}>Sign Up</Link>
      <Link to="/login" exact Component={() => <LoginForm onLogin={setUser}/>}>Login</Link>
    </div>
    }
    </>
  )
}

export default App;
