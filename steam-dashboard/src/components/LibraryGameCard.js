import React, { useRef, useEffect, useState } from 'react';
import './LibraryGameCard.css'; // 确保你已经引入了CSS文件

function LibraryGameCard({ game }) {
    const [imageUrl, setImageUrl] = useState(game.grid);

    return (
        <div className="library-game-card" >
            <div className="library-game-left">
                <img className="library-game-image" src={imageUrl} alt={game.name} />
            </div>
            <div className="library-game-content">
                <p>{game.name}</p>
                <p>Last Play Time: April 20, 2024</p>
                <p>Time Spent: 40 hours</p>
                <p>Size: 80 GB</p>
            </div>
        </div>
    );
}

export default LibraryGameCard;