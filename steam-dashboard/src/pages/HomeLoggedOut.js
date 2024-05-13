import React from 'react';
import 'bulma/css/bulma.css';

const authUrl = process.env.REACT_APP_API_BASE_URL;
const homeStyle = {
  display: 'flex',
  height: '100vh',
  boxSizing: 'border-box'
};

const leftContainerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center', // Align to the start (left) instead of center
  padding: '0 1rem',
  background: 'linear-gradient(to left, #23144f, #030712)',
  color: '#fff',
};

const textGroupStyle = {
  textAlign: 'left', // Ensure text is aligned to the left
  marginBottom: '1.7rem', // Provide some spacing between the text and the form
};
const titleGroupStyle = {
  fontSize: '3.5rem',
  marginBottom: '0rem', // Provide some spacing between the text and the form
};

const SteamStyle = {
  color: '#cb9dff', 
};

const AIOStyle = {
  color: '#ffffff',
};

const buttonContainerStyle = {
  display: 'flex', // Use flexbox for horizontal layout
  flexDirection: 'column', // Align buttons vertically
  alignItems: 'center', // Center buttons horizontally
  marginBottom: '1.5rem',
  width: '50%',
  
};

const buttonStyle = {
  padding: '10px 27px',
  margin: '10px 0', // Add space between buttons
  border: '2px solid #46464657',// 细细的白色描边
  backgroundColor: '#2c2242',
  color: '#fff',
  borderRadius: '11px', // Apply rounded corners
  cursor: 'pointer',
  width: '100%', // Make buttons full-width of the container
};

const GitHubStyle = {
  display: 'flex',
  fontSize: '0.77em', // 字体大小为原来的 80%
  alignItems: 'center', // Aligns the icon and text vertically
  justifyContent: 'flex-start', // Aligns the container content to the left
  gap: '0.5rem', // Creates space between the icon and the text
  // Add additional styling as needed
};

function HomeLoggedOut() {
  // Function to handle the form submission for normal login
  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = authUrl; // Redirect to auth URL
    console.log('LOGIN IN HomeLoggedOut-checkpoint 2');
  };

  // Function to handle the guest login
  const handleGuestLogin = () => {
    window.location.href = "http://saio.us-east-2.elasticbeanstalk.com/home?steamid=76561198856798776";
  };

  return (
    <div style={homeStyle}>
      <div style={leftContainerStyle}>
        <div>
          <div style={textGroupStyle}>
            <h1 style={titleGroupStyle}>
              <span style={SteamStyle}>STEAM </span>
              <span style={AIOStyle}>A I O</span>
            </h1>
            <p>All in one place</p>
          </div>
          <div style={buttonContainerStyle}>
            <button onClick={handleLogin} style={buttonStyle}>Login</button>
            <button onClick={handleGuestLogin} style={buttonStyle}>Guest Login</button>
          </div>
          <div style={GitHubStyle}>
            <img src="/img/ICON/GITHUB_GRAY.png" alt="GitHub Icon" style={{ width: '21px' }} />
            <a href="https://github.com/yifanwow/saio" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
              GitHub
            </a>
          </div>
          {/* Other content like GitHub link, version info, etc. */}
        </div>
        <div style={{ fontSize: '0.77em', color: '#5a4d54', position: 'absolute', bottom: '10px', alignItems: 'center' }}>
          version 0.01
        </div>
      </div>
      
      <div style={{
        flex: 1,
        background: "url('/img/store_home_share.jpg') no-repeat center center",
        backgroundSize: 'cover',
      }} />
    </div>
  );
}

export default HomeLoggedOut;
