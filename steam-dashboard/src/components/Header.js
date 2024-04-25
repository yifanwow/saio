import React from 'react';

function Header() {
  return (
    <div style={headerStyle}></div>
  );
}

const headerStyle = {
  position: 'relative',
  top: '5vh',
  left: '0',
  right: '0',
  margin: 'auto',
  width: '90%',
  height: '50px',  
  backgroundColor: 'rgba(240, 240, 240, 0.5)', // 半透明白色背景
  backdropFilter: 'blur(11px)', // 高斯模糊
  borderRadius: '17px',
  boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.37)',
  zIndex: '999', // 确保在最上层
};

export default Header;