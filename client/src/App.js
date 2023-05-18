import React, { useEffect } from 'react';
import './App.css';
import { Signup } from './components/Signup';


function App() {
  useEffect(() => {
    fetch("/signup")
    .then((r) => r.json())
  }, [])

  // function App() {
  //   useEffect(() => {
  //     fetch("/signup")
  //     .then(r => {
  //       if (r.ok) {
  //         return r.json
  //     }
  //     throw r;
  //   })
  //   .then((data) => console.log(data))
  // }, []);
  
  return (
    <div>
      <Signup />
    </div>
  )
}

export default App;
