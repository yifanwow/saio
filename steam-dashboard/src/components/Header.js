import React from 'react';

function Header() {
  return (
    <div style={headerStyle}></div>
  );
}

const headerStyle = {
  position: 'fixed',
  top: '15px', // Adjust as needed
  left: '0',
  right: '0', // 将右侧设置为0，使其充满整个宽度
  margin: 'auto', // 水平居中
  width: '90%',
  height: '7%',
  backgroundColor: 'rgba(240, 240, 240, 0.3)', // 半透明白色背景
  backdropFilter: 'blur(7px)', // 高斯模糊
  borderRadius: '17px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: '999', // 确保在最上层
};

export default Header;