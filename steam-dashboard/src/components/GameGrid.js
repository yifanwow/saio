import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';

function GameGrid({ games, setGames, gamesPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);

  const numOfPages = Math.ceil(games.length / gamesPerPage);

  const handlePageChange = (newPageIndex) => {
    if (currentPage !== newPageIndex && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentPage(newPageIndex);
        setAnimating(false);
      }, 700); // Duration should match the CSS animation duration
    }
  };

  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);

  return (
    <div className="game-grid-container">
      <div className="game-grid-big">
        <div className={`game-grid ${animating ? 'game-grid-fade-out' : 'game-grid-fade-in'}`}>
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
            &#9679;{/* Using bullet points for pagination */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
