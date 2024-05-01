import React, { useRef, useEffect, useState } from 'react';
import './GameCard.css'; // 确保你已经引入了CSS文件
import UpdateGameGrid from './UpdateGameGrid';

function GameCard({ game }) {
  const textRef = useRef(null);
  const [isLongText, setIsLongText] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleChangeGrid = () => {
    const newGridUrl = prompt("Please enter the new grid URL:");
    UpdateGameGrid(game.appid, newGridUrl);
  };

  useEffect(() => {
    if (textRef.current.scrollWidth > textRef.current.offsetWidth) {
      setIsLongText(true); // 如果文本宽度超出容器宽度，则启动滚动
      // 复制文本并将其追加到末尾，例如 "ABCDEFG   ABCDEFG"
      const clonedText = `${game.name.toUpperCase()}${'\u00A0'.repeat(10)}${game.name.toUpperCase()}`;
      textRef.current.innerText = clonedText;
    }
  }, []);

  return (
    <div className="game-card">
      <img src={game.grid} alt={game.name} className="game-image" />
      <div className="option-button" onClick={toggleMenu} ></div>
      <div className="game-name-container">
        <div
          ref={textRef}
          className={`game-name ${isLongText ? 'long-text' : ''}`}
        >
          {game.name.toUpperCase()}
          
        </div>
      </div>      
      {menuVisible && (
        <div className="options-menu">
          <div className="option-item" onClick={handleChangeGrid}>Change grid post</div>
          <div className="option-item">Rating</div>
        </div>)}
    </div>
  );
}

export default GameCard;