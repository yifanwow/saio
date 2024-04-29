import React, { useRef, useEffect, useState } from 'react';
import './GameCard.css'; // 确保你已经引入了CSS文件

function GameCard({ game }) {
  const textRef = useRef(null);
  const [isLongText, setIsLongText] = useState(false);

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
      <div className="game-name-container">
        <div
          ref={textRef}
          className={`game-name ${isLongText ? 'long-text' : ''}`}
        >
          {game.name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
