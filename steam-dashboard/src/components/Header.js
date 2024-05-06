import React, { useState, useRef } from 'react';

function Header({ current, onChange }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleClick = (val) => {
    if (val === current) {
      onChange('grid');
    } else {
      onChange(val);
    }
    setActiveMenu(null);
  };
  const handleLogout = () => {
    console.log('Logging out...');
    fetch(`${process.env.REACT_APP_API_BASE}/api/logout`, {
      method: 'POST',
      credentials: 'include'  // Make sure to include credentials if your API requires session cookies
    })
    .then(response => {
      if(response.ok) {
        // Assuming the logout redirects to a login page or updates the UI to reflect the logout
        window.location.href = '/'; // or any other logic
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div style={headerContainerStyle}>
      <div style={menuContainerStyle}>
        <button style={buttonStyle} onClick={() => handleClick('rank')}>RANKING</button>
      </div>
      <div style={menuContainerStyle}>
        <button style={buttonStyle} onClick={() => handleClick('library')}>LIBRARY</button>
      </div>
      <div style={menuContainerStyle}>
      <button style={buttonStyle} onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
}

const headerContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'relative',
  top: '2vh',
  margin: 'auto',
  width: '70%',
  height: '5vh',
  marginBottom: '1vh',
  borderRadius: '17px',
  zIndex: '999',
};

const menuContainerStyle = {
  position: 'relative',
  display: 'inline-block'
};

const buttonStyle = {
  padding: '1.3vh 2vw',
  background: 'none',
  borderRadius: '2vw',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'rgba(240, 240, 240, 0.5)',
  boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.57)',
  backdropFilter: 'blur(11px)',
  fontSize: 'clamp(0.7rem, 0.9vw, 2.3rem)',
  fontWeight: 'bold',
  textShadow: '0px 0px 0.7vw rgba(0, 0, 0, 0.95)',
};

const settingsMenuStyle = {
  position: 'absolute',
  top: '100%', // Positioned right below the button
  width: '100%', // Same width as the button
  background: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  animation: 'slideDown 0.3s ease-out'
};

export default Header;
