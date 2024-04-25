// WelcomePage.js

import React from 'react';

function WelcomePage({ userInfo, bg1Position, bg2Position }) {
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

  const instructionTextStyle = {
    position: 'absolute',
    bottom: '20px', // Adjust the value as needed for your layout
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.3)',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...bgStyle, top: `${bg1Position}%` }}></div>
      <div style={{ ...bgStyle, top: `${bg2Position - 100}%` }}></div>
      <div style={avatarStyle}></div>
      <div style={textStyle}>
        <h2 className="subtitle is-1" style={{ color: '#f0ebfa', letterSpacing: '1.2px', fontSize: '1.7rem' }}>
          Welcome back, {userInfo && userInfo.personaname}
        </h2>
        {userInfo && (
          <p className="subtitle is-6">Today is {userInfo.date} days since you joined Steam.</p>
        )}
      </div>
      <div style={instructionTextStyle}>
        <p>Press Enter</p>
      </div>
    </div>
  );
}

export default WelcomePage;
