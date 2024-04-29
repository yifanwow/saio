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
    fontSize: '2.5rem',
    color: '#fff',
    fontWeight: 550,
    letterSpacing: '7px',
    textShadow: '0px 0px 19px rgba(0, 0, 0, 0.9)',
    marginBottom: '77px',
  };
  const dataSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textShadow: '0px 3px 13px rgba(0, 0, 0, 0.77)',
    textAlign: 'center',
  };

  const dataContainerStyle = {
    display: 'flex',
    letterSpacing: '3px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 50px', // Add spacing between columns
  };

  const dataValueStyle = {
    fontSize: '2.1rem',
   
    color: '#fff',
    letterSpacing: '7px',
    fontWeight: 'bold',
    marginBottom: '5px', // Adjust as needed
  };

  const dataLabelStyle = {
    fontSize: '1.3rem',
    fontWeight: '550',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '20px', // Adjust as needed
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
          <span style={dataLabelStyle}>Game owned</span>
        </div>
        <div style={dataContainerStyle}>
          <span style={dataValueStyle}>{userInfo.totalGameHours}</span>
          <span style={dataLabelStyle}>Game hours</span>
        </div>
        <div style={dataContainerStyle}>
          <span style={dataValueStyle}>{userInfo.accountValue}</span>
          <span style={dataLabelStyle}>Game value</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;