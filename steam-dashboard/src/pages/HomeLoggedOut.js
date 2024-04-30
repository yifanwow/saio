import React from 'react';
import 'bulma/css/bulma.css';

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
  marginBottom: '2.7rem', // Provide some spacing between the text and the form
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

const inputButtonContainerStyle = {
  display: 'flex', // Use flexbox for horizontal layout
  alignItems: 'left', // Stretch the items to fill the container height
  background: '#121212', // Dark background for the input
  borderRadius: '11px',
  border: '2px solid #4a4d54',
  overflow: 'hidden', // Prevents child elements from overflowing
  marginBottom: '1.3rem',
  width: '77%',
};

const inputStyle = {
  flexGrow: 1, // Input should take all available space
  padding: '10px 15px',
  fontSize: '1rem',
  border: 'none', // Remove border since it's now inside the container
  outline: 'none',
  color: '#fff', // Text color for the input
  backgroundColor: '#121212',
  width: '30%',
};

const buttonStyle = {
  padding: '10px 27px',
  border: 'none',
  backgroundColor: '#2c2242',
  color: '#fff',
  borderRadius: '0', // Reset border-radius as the container now controls this
  cursor: 'pointer',

};

const GitHubStyle ={
  display: 'flex',
  fontSize: '0.77em', // 字体大小为原来的 80%
  alignItems: 'center', // Aligns the icon and text vertically
  justifyContent: 'flex-start', // Aligns the container content to the left
  gap: '0.5rem', // Creates space between the icon and the text
  // Add additional styling as needed
};

function HomeLoggedOut() {
  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3001/auth/steam';
    // Perform your login logic here
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
        <form onSubmit={handleSubmit} style={inputButtonContainerStyle}>
          <input type="text" placeholder="Steam ID" style={inputStyle} />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <div style={GitHubStyle}>
        <img src="/img/ICON/GITHUB_GRAY.png" alt="GitHub Icon" style={{ width: '21px' }} />
          <a href="https://github.com/yifanwow/wishMeLuck" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
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