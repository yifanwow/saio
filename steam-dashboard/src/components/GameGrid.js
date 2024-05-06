import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';

function GameGrid({ games, setGames, gamesPerPage = 8}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [newPage, setNewPage] = useState(0); // 存储新页面索引
  

  const numOfPages = Math.ceil(games.length / gamesPerPage);

  useEffect(() => {
    if (animatingOut) {
      const timerOut = setTimeout(() => {
        setAnimatingOut(false);
        setCurrentPage(newPage); // 同时更新页面
      }, 700); // 渐出动画持续时间
      return () => clearTimeout(timerOut);
    }
    if (animatingIn) {
      const timerIn = setTimeout(() => {
        setAnimatingIn(false);
      }, 700); // 渐入动画持续时间
      return () => clearTimeout(timerIn);
    }
  }, [animatingOut, animatingIn, newPage]);

  const handlePageChange = (newPageIndex) => {
    if (currentPage !== newPageIndex) {
      setNewPage(newPageIndex);
      setAnimatingOut(true); // 启动渐出动画
      setAnimatingIn(true); 
    }
  };

  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);

  return (
    <div className="game-grid-container">
      <div className='game-grid-big'>
        <div className={`game-grid ${animatingOut ? 'game-grid-fade-out' : ''} ${animatingIn ? 'game-grid-fade-in' : ''}`}>
          {selectedGames.map(game => (
            <GameCard key={game.appid} game={game} games={games} setGames={setGames} />
          ))}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: numOfPages }, (_, index) => (
          <button
            key={index}
            className={`page-item ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
