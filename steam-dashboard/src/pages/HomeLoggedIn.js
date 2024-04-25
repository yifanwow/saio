// HomeLoggedIn.js
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { useLocation } from 'react-router-dom';
import WelcomePage from '../components/WelcomePage';
import Header from '../components/Header';

function HomeLoggedIn() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('steamid');
  
  // Use state to manage avatar and registerDate fetched from localStorage
  const [userInfo, setUserInfo] = useState(null);

  // Update localStorage only when parameters change
  useEffect(() => {
    fetchUserInfo();
  }, [username]); // Fetch user info once when component mounts

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/users_summary.json',{
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:3000',
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('userID: ', username);
        const userData = data.users.find(user => user.steamid === username);
        setUserInfo(userData);
        console.log('User data fetched successfully:', userData);
      } else {
        console.log('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // State to manage background positions
  const [bg1Position, setBg1Position] = useState(0);
  const [bg2Position, setBg2Position] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBg1Position(prevPosition => prevPosition + 0.1);
      setBg2Position(prevPosition => prevPosition + 0.1);

      if (bg1Position >= 100) {
        setBg1Position(-100);
      }
      if (bg2Position >= 200) {
        setBg2Position(0);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [bg1Position, bg2Position]);

  // Remove the unused variable 'showWelcomePage'
  const [, setShowWelcomePage] = useState(true);

  const handleHideWelcomePage = () => {
    setShowWelcomePage(false);
  };

  return (
    <div>
      {/* {<Header/>} */}
      <WelcomePage userInfo={userInfo} bg1Position={bg1Position} bg2Position={bg2Position} setShowWelcomePage={handleHideWelcomePage} />
    </div>
  );
}

export default HomeLoggedIn;
