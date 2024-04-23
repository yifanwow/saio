import React from 'react';
import { useNavigate } from 'react-router-dom';

const loginPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(to left, #000046, #1cb5e0)',
};

const titleStyle = {
  color: '#fff',
  fontSize: '2.5rem',
  marginBottom: '1rem',
};

const inputStyle = {
  padding: '10px 15px',
  fontSize: '1rem',
  margin: '0.5rem 0',
  borderRadius: '5px',
  border: '1px solid #fff',
  outline: 'none',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  color: '#fff',
  background: '#007bff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '1rem 0',
};

function LoginPage({ setIsLoggedIn }) {
  let navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div style={loginPageStyle}>
      <h1 style={titleStyle}>Login to STEAM AIO</h1>
      <input style={inputStyle} type="email" placeholder="Email address" />
      <button style={buttonStyle} onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
