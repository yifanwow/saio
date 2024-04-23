import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={<HomeLoggedOut />} />
        <Route path="/home" element={<HomeLoggedIn />} />
      </Routes>
    </Router>
  );
}

export default App;
