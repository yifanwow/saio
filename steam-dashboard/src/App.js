import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLoggedIn from './pages/HomeLoggedIn';
import HomeLoggedOut from './pages/HomeLoggedOut';
import Homepage from './pages/Homepage';
import LoginPage from './LoginPage';
import Librarypage from './pages/Librarypage';
import Rankingpage from './pages/Rankingpage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />} />
        <Route path="/home" element={<HomeLoggedIn />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Librarypage" element={<Librarypage />} />
        <Route path="/Rankingpage" element={<Rankingpage />} />
      </Routes>
    </Router>
  );
}
//if use did not login,or visit home page, it will show the login page
export default App;
