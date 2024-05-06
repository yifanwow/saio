import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';

function GameGrid({ games, setGames, gamesPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [newPage, setNewPage] = useState(0);

  const numOfPages = Math.ceil(games.length / gamesPerPage);

  useEffect(() => {
    if (animatingOut) {
      const timerOut = setTimeout(() => {
        setAnimatingOut(false);
        setCurrentPage(newPage);
      }, 700);
      return () => clearTimeout(timerOut);
    }
    if (animatingIn) {
      const timerIn = setTimeout(() => {
        setAnimatingIn(false);
      }, 700);
      return () => clearTimeout(timerIn);
    }
  }, [animatingOut, animatingIn, newPage]);

  const handlePageChange = (newPageIndex) => {
    if (currentPage !== newPageIndex) {
      setNewPage(newPageIndex);
      setAnimatingOut(true);
      setAnimatingIn(true);
    }
  };

  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);

  // Function to calculate the range of pages to display
  const getPageRange = () => {
    const rangeSize = 11; // Maximum number of pages to display
    let start = Math.max(0, currentPage - 5);
    let end = Math.min(numOfPages, start + rangeSize);
    if (end - start < rangeSize) {
      start = Math.max(0, end - rangeSize);
    }
    return Array.from({ length: (end - start) }, (_, index) => start + index);
  };

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
        {getPageRange().map(pageIndex => (
          <button
            key={pageIndex}
            className={`page-item ${pageIndex === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(pageIndex)}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
