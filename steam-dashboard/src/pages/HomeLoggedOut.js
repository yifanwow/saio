import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';

const authUrl = process.env.REACT_APP_API_BASE_URL;

const HomeLoggedOut = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const homeStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row', // 根据屏幕宽度设置布局方向
    height: '100vh',
    boxSizing: 'border-box'
  };

  const leftContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isMobile ? 'center' : 'center',
    padding: '1rem',
    background: 'linear-gradient(to left, #23144f, #030712)',
    color: '#fff',

  };

  const textGroupStyle = {
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: '1.7rem',
  };

  const leftstuff = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-start',
  };
  const titleGroupStyle = {
    fontSize: '3.5rem',
    marginBottom: '0rem',
  };

  const SteamStyle = {
    color: '#cb9dff',
  };

  const AIOStyle = {
    color: '#ffffff',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
    width: isMobile ? '80%' : '50%',
  };

  const buttonStyle = {
    padding: '10px 27px',
    margin: '10px 0',
    border: '2px solid #46464657',
    backgroundColor: '#2c2242',
    color: '#fff',
    borderRadius: '11px',
    cursor: 'pointer',
    width: '100%',
  };

  const GitHubStyle = {
    display: 'flex',
    fontSize: '0.77em',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0.5rem',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = authUrl;
  };

  const handleGuestLogin = () => {
    window.location.href = "http://saio.us-east-2.elasticbeanstalk.com/home?steamid=76561198856798776";
  };

  return (
    <div style={homeStyle}>
      <div style={leftContainerStyle}>
        <div style={leftstuff}>
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
        </div>
        <div style={{ fontSize: '0.77em', color: '#5a4d54', position: 'absolute', bottom: '50px', alignItems: 'center' }}>
          Note: You need to set your steam profile to PUBLIC to use all features.
        </div>
        <div style={{ fontSize: '0.5em', color: '#5a4d54', position: 'absolute', bottom: '30px', alignItems: 'center' }}>
          <span>Last Updates 05/22/2024</span>
        </div>
        <div style={{ fontSize: '0.5em', color: '#5a4d54', position: 'absolute', bottom: '10px', alignItems: 'center' }}>
          <span>Version 0.1.1</span>
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
