import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
