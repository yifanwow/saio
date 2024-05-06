import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';

function GameGrid({ games, gamesPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [pendingPage, setPendingPage] = useState(null); // 新增：用于存储将要切换到的页面

  const numOfPages = Math.ceil(games.length / gamesPerPage);
  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);

  useEffect(() => {
    if (animatingOut) {
      const timer = setTimeout(() => {
        setAnimatingOut(false);
        setAnimating(true);
        setCurrentPage(pendingPage); // 在动画完成后切换到新页面
        setPendingPage(null); // 清除待处理的页面
      }, 700);
      return () => clearTimeout(timer);
    }
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [animating, animatingOut, pendingPage]);

  const handlePageChange = (newPage) => {
    if (currentPage !== newPage) {
      setAnimatingOut(true);
      setPendingPage(newPage); // 在开始渐出动画前设置将要切换的页面
    }
  };

  return (
    <div className="game-grid-container">
      <div className='game-grid-big'>
        <div className={`game-grid ${animating ? 'game-grid-fade-in' : ''} ${animatingOut ? 'game-grid-fade-out' : ''}`}>
          {selectedGames.map(game => (
            <GameCard key={game.appid} game={game} />
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
