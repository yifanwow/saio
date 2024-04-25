import React from 'react';

function Header() {
  return (
    <div style={headerContainerStyle}>
      <button style={buttonStyle}>RANKING</button>
      <button style={buttonStyle}>LIBRARIES</button>
      <button style={buttonStyle}>SETTING</button>
    </div>
  );
}

const headerContainerStyle = {
  display: 'flex',        // 启用 flexbox 以水平排列按钮
  justifyContent: 'space-around', // 将按钮均匀分布在容器中
  alignItems: 'center',   // 垂直居中按钮
  position: 'relative',
  top: '5vh',
  left: '0',
  right: '0',
  margin: 'auto',
  width: '70%',
  height: '50px',

// 高斯模糊
  borderRadius: '17px',
  
  zIndex: '999', // 确保在最上层
};

const buttonStyle = {
  padding: '15px 40px',   // 按钮内部间距
  background: 'none',    // 透明背景
 // border: '2px solid white', // 白色边框
  borderRadius: '10px',  // 圆角
  cursor: 'pointer',     // 鼠标样式变为指针
  color: 'white', 
  backgroundColor: 'rgba(240, 240, 240, 0.5)', 
  boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.37)',
  backdropFilter: 'blur(11px)',       // 文字颜色
  fontSize: '16px',      // 字号
  fontWeight: 'bold',     // 字体加粗
  textShadow: '0px 0px 7px rgba(0, 0, 0, 0.7)'
 
};

export default Header;
