import React, { useRef, useEffect, useState } from 'react';
import './GameCard.css'; // 确保你已经引入了CSS文件
import UpdateGameGrid from './UpdateGameGrid';
import Rating from '@mui/material/Rating'; // Import the Rating Component
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffffff',
  },
  '& .MuiRating-iconHover': {
    color: '#ffffff',
  },
});

function GameCard({ game }) {
  const textRef = useRef(null);
  const [isLongText, setIsLongText] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(game.grid);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(game.rate); // State to hold the rating

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onUpdateGrid = (appId, newGridUrl) => {
    if (!newGridUrl) return; // 如果用户没有输入 URL，不执行任何操作

    fetch(`${process.env.REACT_APP_API_BASE}/update-grid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newGridUrl })
    })
      .then(response => response.json())
      .then(data => {
        alert('Grid URL updated successfully.');
        setImageUrl(newGridUrl);  // 成功后更新图片 URL
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update grid URL.');
      });
  };

  const handleChangeGrid = () => {
    const newGridUrl = prompt("Please enter the new grid URL:");
    onUpdateGrid(game.appid, newGridUrl);
  };

  const toggleRating = () => {
    setRatingVisible(!ratingVisible);
  };

  const handleChangeRating = (val) => {
    console.log(val)
    onUpdateRating(game.appid, val);
  };

  const handleDeleteRate = () => {
    onUpdateRating(game.appid, -1)
  }

  // Update Rating front-end
  const onUpdateRating = (appId, rate) => {

    fetch(`${process.env.REACT_APP_API_BASE}/update-rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newRate: rate })
    })
      .then(response => response.json())
      .then(data => {
        if (rate === -1) {
          alert('Rating deleted successfully.');
          setRating(null);
        } else {
          alert('Rating updated successfully.');
          setRating(rate);  // Enables rating succesfully
        }
        setRatingVisible(false)
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update grid URL.');
      });
  };


  useEffect(() => {
    if (textRef.current.scrollWidth > textRef.current.offsetWidth) {
      setIsLongText(true); // 如果文本宽度超出容器宽度，则启动滚动
      // 复制文本并将其追加到末尾，例如 "ABCDEFG   ABCDEFG"
      const clonedText = `${game.name.toUpperCase()}${'\u00A0'.repeat(10)}${game.name.toUpperCase()}`;
      textRef.current.innerText = clonedText;
    }
  }, []);

  return (
    <div className="game-card" onMouseLeave={() => setMenuVisible(false)}>
      <img src={imageUrl} alt={game.name} className="game-image" />
      <div className="option-button" onClick={toggleMenu}></div>
      <div className="game-name-container">
        <div ref={textRef} className={`game-name ${isLongText ? 'long-text' : ''}`}>
          {game.name.toUpperCase()}
        </div>

      </div>
      <div className="game-rate-container">
        {ratingVisible ?
          <StyledRating
            name="customized-color"
            value={rating}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              handleChangeRating(newValue);
            }}
          /> : rating && <StyledRating
            name="customized-color"
            value={rating}
            readOnly
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        }
      </div>
      <div className={`options-menu ${menuVisible ? 'active' : ''}`}>
        <div className="option-item" onClick={handleChangeGrid}>Change grid post</div>
        {rating ?
          <div className="option-item" onClick={handleDeleteRate}>Delete</div> :
          <div className="option-item" onClick={toggleRating}>Rating</div>
        }
      </div>
    </div>
  );
}

export default GameCard;