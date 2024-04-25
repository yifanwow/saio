import React from 'react';

const UserProfileCard = ({ userInfo }) => {
  const containerStyle = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100vh',
    background: 'linear-gradient(to left, #23144f, #030712)', // 紫黑色渐变背景
  };

  const avatarStyle = {
    width: '39vh',
    height: '39vh',
    borderRadius: '50%',
    boxShadow: '0px 11px 19px rgba(0, 0, 0, 0.7)',
    marginBottom: '20px',
  };
const nameStyle = {
    fontSize: '2.5rem',
    color: '#fff',
    marginBottom: '20px',
}
  const textContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '1.5rem',
  };

  const textStyle = {
    fontWeight: 'bold',
    marginRight: '20px',
    color: '#fff',
    fontSize: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      
        <img src={userInfo.avatarfull} alt="Avatar" style={avatarStyle} />
        <h1 style={nameStyle}>{userInfo.personaname}</h1>
        <div style={textContainerStyle}>
          <div>
            <div style={{ ...titleStyle, textAlign: 'right' }}>Game owner:</div>
            <div style={{ ...titleStyle, textAlign: 'right' }}>Game hour:</div>
            <div style={{ ...titleStyle, textAlign: 'right' }}>Game value:</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            
            <div style={textStyle}>{userInfo.gameCount}</div>
            <div style={textStyle}>{userInfo.totalGameHours} Hours</div>
            <div style={textStyle}>{userInfo.accountValue}</div>
          </div>
        </div>
      
    </div>
  );
};

export default UserProfileCard;
