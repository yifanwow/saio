import React from 'react';
import GameCard from './GameCard';
import './GameGrid.css';  // 引入 CSS 文件来管理样式

function GameGrid({ games }) {
  return (
    <div className="game-grid">
      {games.map(game => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
}

export default GameGrid;
