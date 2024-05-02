import React from 'react';

import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate =useNavigate()
  const handleClick = (val) => {
    navigate(`/${val}`)
  }
  return (
    <div style={headerContainerStyle}>library
      <button style={buttonStyle} onClick={()=>handleClick('ranking')}>RANKING</button>
      <button style={buttonStyle} onClick={()=>handleClick('Librarypage')}>LIBRARY</button>

      <button style={buttonStyle}>SETTING</button>
    </div>
  );
}

const headerContainerStyle = {
  display: 'flex',        // 启用 flexbox 以水平排列按钮
  justifyContent: 'space-around', // 将按钮均匀分布在容器中
  alignItems: 'center',   // 垂直居中按钮
  position: 'relative',
  top: '3.9vh',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  width: '70%',
  height: '2.7vh',
  marginBottom: '7vh', 

  // 高斯模糊
  borderRadius: '17px',

  zIndex: '999', // 确保在最上层
};

const buttonStyle = {
  padding: '1.3vh 2vw',   // 按钮内部间距
  background: 'none',    // 透明背景
  // border: '2px solid white', // 白色边框
  borderRadius: '2vw',  // 圆角
  cursor: 'pointer',     // 鼠标样式变为指针
  color: 'white',
  backgroundColor: 'rgba(240, 240, 240, 0.5)',
  boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.57)',
  backdropFilter: 'blur(11px)',       // 文字颜色
  fontSize: 'clamp(0.7rem, 1vw, 2.7rem)',      // 字号
  fontWeight: 'bold',     // 字体加粗
  textShadow: '0px 0px 0.7vw rgba(0, 0, 0, 0.95)'

};

export default Header;
