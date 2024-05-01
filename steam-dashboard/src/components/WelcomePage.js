// WelcomePage.js
import React, { useState, useEffect } from 'react';

function WelcomePage({ userInfo, bg1Position, bg2Position, setShowWelcomePage }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleClick = () => {
      setIsVisible(false);
      setShowWelcomePage(false);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setIsVisible(false);
        setShowWelcomePage(false);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [setShowWelcomePage]);

  const bgStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%', // Double the height for continuous effect
    background: "url('/img/banner.webp') no-repeat center center",
    backgroundSize: 'cover',
    opacity: isVisible ? 1 : 0, // 根据 isVisible 状态设置透明度
    transition: 'opacity 1.9s ease', // 添加渐变效果
  };
  

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const avatarStyle = {
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    backgroundImage: userInfo ? `url('${userInfo.avatarfull}')` : 'none',
    backgroundSize: 'cover',
    boxShadow: '0 9px 9px rgba(0,0,0,0.6)',
    marginBottom: '30px',
    zIndex: 1,
    transform: isVisible ? 'translateY(0)' : 'translateY(100vh)', // 根据 isVisible 状态设置垂直位移
    transition: 'transform 3.0s ease', // 添加渐变效果
  };

  const textStyle = {
    textAlign: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    zIndex: 1,
    transform: isVisible ? 'translateY(0)' : 'translateY(100vh)', // 根据 isVisible 状态设置垂直位移
    opacity: isVisible ? 1 : 0, // 根据 isVisible 状态设置透明度
    transition: 'transform 3.0s ease, opacity 1.3s ease', // 添加渐变效果
  };

  const instructionTextStyle = {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.3)',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    opacity: isVisible ? 1 : 0, // 根据 isVisible 状态设置透明度
    transition: 'opacity 1.1s ease', // 添加渐变效果
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
