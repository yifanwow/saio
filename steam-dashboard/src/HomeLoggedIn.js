import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { useLocation } from 'react-router-dom';

function HomeLoggedIn() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('steamid');
  
  // Use state to manage avatar and registerDate fetched from localStorage
  const [userInfo, setUserInfo] = useState(null);

  // Update localStorage only when parameters change
  useEffect(() => {
    fetchUserInfo();
  }, []); // Fetch user info once when component mounts

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

  const bgStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%', // Double the height for continuous effect
    background: "url('/img/banner.webp') no-repeat center center",
    backgroundSize: 'cover'
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const avatarStyle = {
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    backgroundImage: userInfo ? `url('${userInfo.avatarfull}')` : 'none', // Correctly formatted URL
    backgroundSize: 'cover',
    boxShadow: '0 9px 9px rgba(0,0,0,0.6)',
    marginBottom: '30px',
    zIndex: 1
  };

  const textStyle = {
    textAlign: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    zIndex: 1
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...bgStyle, top: `${bg1Position}%` }}></div>
      <div style={{ ...bgStyle, top: `${bg2Position - 100}%` }}></div>
      <div style={avatarStyle}></div>
      <div style={textStyle}>
        <h2 className="subtitle is-1" style={{ color: '#f0ebfa', letterSpacing: '1.2px', fontSize: '1.7rem' }}>
          Welcome back, {userInfo.personaname}
        </h2>
        {userInfo && (
        <p className="subtitle is-6">Today is {userInfo.date} days since you joined Steam.</p>
      )}
      </div>
    </div>
  );
}

export default HomeLoggedIn;
