import React, { useEffect } from 'react';
import './App.css';
import { Signup } from './components/Signup';


function App() {
  useEffect(() => {
    fetch("/signup")
    .then((r) => r.json())
  }, [])
  return (
    <div>
      <Signup />
    </div>
  )
}

export default App;
