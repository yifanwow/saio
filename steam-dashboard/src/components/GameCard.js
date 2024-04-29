import React from 'react';
import './GameCard.css';  // 引入 CSS 文件来管理样式

function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.grid} alt={game.name} className="game-image" />
      <div className="game-name">{game.name.toUpperCase()}</div>
    </div>
  );
}

export default GameCard;
