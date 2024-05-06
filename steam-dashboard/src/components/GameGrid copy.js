import React, { useState } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function GameGrid({ games, gamesPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(0);

  const numOfPages = Math.ceil(games.length / gamesPerPage);
  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);
  console.log("Current page games:", selectedGames.map(game => game.appid));

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="game-grid-container">

      <div className='game-grid-big'>
      <div className="game-grid">
        {selectedGames.map(game => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div></div>
      <div className="pagination">
        {Array.from({ length: numOfPages }, (_, index) => (
          <button
            key={index}
            className={`page-item ${index === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(index)}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameGrid;
