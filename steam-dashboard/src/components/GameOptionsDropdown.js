import React, { useState } from 'react';
import './GameOptionsDropdown.css'; 

const GameOptionsDropdown = ({ onModifyPoster, onWriteReview }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="game-options-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">...</button>
            {isOpen && (
                <ul className="options-menu">
                    <li onClick={onModifyPoster}>Modify Game Poster</li>
                    <li onClick={onWriteReview}>Write Review</li>
                </ul>
            )}
        </div>
    );
};

export default GameOptionsDropdown;
