import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLoggedIn from './pages/HomeLoggedIn';
import HomeLoggedOut from './pages/HomeLoggedOut';
import Homepage from './pages/Homepage';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />} />
        <Route path="/home" element={<HomeLoggedIn />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}
//if use did not login,or visit home page, it will show the login page
export default App;
