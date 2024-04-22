import React from 'react';

const homeStyle = {
  display: 'flex',
  height: '100vh',
};

const leftContainerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 2rem',
  background: 'linear-gradient(to left, #000046, #1cb5e0)', // Assuming a dark background similar to Steam's style
  color: '#fff',
};

const rightContainerStyle = {
  flex: 1,
  background: `url('/img/store_home_share.jpg') no-repeat center center`,
  backgroundSize: 'cover',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const subtitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '2rem',
};

const buttonStyle = {
  padding: '10px 15px',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#66c0f4',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

function HomeLoggedOut() {
  return (
    <div style={homeStyle}>
      <div style={leftContainerStyle}>
        <h1 style={titleStyle}>STEAM AIO</h1>
        <p style={subtitleStyle}>All in one place.</p>
        <input type="email" placeholder="Email address" />
        <button style={buttonStyle}>Login</button>
        {/* Other content like GitHub link, version info, etc. */}
      </div>
      <div style={rightContainerStyle} />
    </div>
  );
}

export default HomeLoggedOut;
