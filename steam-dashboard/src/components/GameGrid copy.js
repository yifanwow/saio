import React, { useState } from 'react';
import GameCard from './GameCard';
import './GameGrid.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
      <TransitionGroup className="game-grid-big" component={null}>
        <CSSTransition
          key={currentPage}
          timeout={500}
          classNames="page"
        >
          <div className="game-grid">
            {selectedGames.map(game => (
              <GameCard key={game.appid} game={game} />
            ))}
          </div>
        </CSSTransition>
      </TransitionGroup>
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
