import React from 'react';
import ProfileBackground from './ProfileBackground';

const UserProfileCard = ({ userInfo }) => {
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    boxShadow: '9px 0px 55px rgba(0, 0, 0, 0.7)',
    height: '100vh',
    padding: '0 5vw', 
    // Include ProfileBackground as the background
  };


  const avatarArea = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  };

  const avatarStyle = {
    width: '25vh',
    height: '25vh',
    borderRadius: '50%',
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.77)',
    marginBottom: '20px',
  };

  const nameStyle = {
    fontSize: 'clamp(2rem, 2.5vw, 2.5rem)', // Adjusts between 2rem and 2.5rem based on viewport width
    color: '#fff',
    fontWeight: 550,
    letterSpacing: '3px',
    textShadow: '0px 0px 1.9vw rgba(0, 0, 0, 0.91)',
    marginBottom: '77px',
  };

  
  const dataSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // This will evenly space the three child elements
    alignItems: 'center',
    width: '100%',
    textShadow: '0px 3px 0.7vw rgba(0, 0, 0, 0.79)',
    textAlign: 'center',
    padding: '0 0px',
  };
  const dataContainerStyle = {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  };
  const dataValueStyle = {
    fontSize: 'clamp(0.5rem, 2.1vw, 3.1rem)', // Adjusted for better responsiveness
    color: '#fff',
    letterSpacing: 'clamp(-5px, 0.5vw, 9px)',
    fontWeight: 'bold',
    marginBottom: '1.5vh',
  };
  const dataLabelStyle = {
    fontSize: 'clamp(0.7rem, 1.3vw, 1.3rem)',
    fontWeight: '550',
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: 'clamp(-5px, 0.5vw, 7px)',// Adjusted margin for visual balance
    marginBottom: '5px', // Consistent bottom margin for a cleaner look
  };
  const dataLabelStyle2 = {
    ...dataLabelStyle, // Inherits properties from dataLabelStyle
    marginBottom: '1vh', // Additional spacing for the lower label
  };

  return (
    <div style={containerStyle}>
      <ProfileBackground />
      <div style={avatarArea}>
      <img src={userInfo.avatarfull} alt="Avatar" style={avatarStyle} />
      <p style={nameStyle}>{userInfo.personaname}</p>
      </div>
      <div style={dataSectionStyle}>
        <div style={dataContainerStyle}>
          <span style={dataValueStyle}>{userInfo.gameCount}</span>
          <span style={dataLabelStyle}>Game</span>
          <span style={dataLabelStyle2}>Owned</span>
        </div>
        <div style={dataContainerStyle}>
          <span style={dataValueStyle}>{userInfo.totalGameHours}</span>
          <span style={dataLabelStyle}>Game</span>
          <span style={dataLabelStyle2}>hours</span>
        </div>
        <div style={dataContainerStyle}>
          <span style={dataValueStyle}>{userInfo.accountValue}</span>
          <span style={dataLabelStyle}>Game</span>
          <span style={dataLabelStyle2}>Value</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;