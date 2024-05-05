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
  const params = new URLSearchParams(window.location.search);
  const steamID = params.get('steamid');
  const textRef = useRef(null);
  const [isLongText, setIsLongText] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(game.diyGrid || game.grid);


  const [ratingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(game.rate); // State to hold the rating

  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState(game.categories || []); // Assuming categories are passed in the game object
  const [inputValue, setInputValue] = useState('');


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onUpdateGrid = (appId, newGridUrl, steamID) => {
    if (!newGridUrl) return; // 如果用户没有输入 URL，不执行任何操作

    fetch(`${process.env.REACT_APP_API_BASE}/update-grid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newGridUrl, steamID})
    })
      .then(response => response.json())
      .then(data => {
        alert('Grid URL updated successfully.');// 成功后更新图片 URL
        setImageUrl(newGridUrl);  // 成功后更新图片 URL
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update grid URL.');
      });
  };

  const clearCustomGrid = () => {
    console.log(`${process.env.REACT_APP_API_BASE}/clear-grid`);
    fetch(`${process.env.REACT_APP_API_BASE}/clear-grid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: game.appid, steamID }) // Assume steamID is passed to the game object or obtained differently
    })
    .then(response => response.json())
    .then(data => {
      alert('Custom grid cleared successfully.');
      setImageUrl(game.grid); // Reset the image URL to the default grid
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to clear custom grid.');
    });
  };


  const handleChangeGrid = () => {
    const newGridUrl = prompt("Please enter the new grid URL:");
    onUpdateGrid(game.appid, newGridUrl, steamID);
  };


  // Gloria

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


  // Hongyang's feature of implementing categories
  const handleAddOrDeleteCategory = () => {
    if (tags.length > 0) {
      // Clear categories if they exist
      updateCategories(game.appid, []);
      setTags([]);
    } else {
      // Show input to add a new category
      setInputVisible(true);
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newTags = [...tags, inputValue];
      updateCategories(game.appid, newTags);
      setTags(newTags);
      setInputValue('');
      setInputVisible(false);  // Hide the input field after adding
    }
  };

  const updateCategories = (appId, categories) => {
    fetch(`${process.env.REACT_APP_API_BASE}/update-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newCategories: categories })
    })
      .then(response => response.json())
      .then(data => {
        if (categories === -1) {
         // alert('Category deleted succesfully');

        }
        // alert('Categories updated successfully.');
      })
      .catch(error => {
        console.error('Error updating categories:', error);
        alert('Failed to update categories.');
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
        <div className="option-item" onClick={handleChangeGrid}>Change Grid Post</div>
        {game.diyGrid && (
          <div className="option-item" onClick={clearCustomGrid}>Clear Grid</div>
        )}
        {rating ?
          <div className="option-item" onClick={handleDeleteRate}>Delete</div> :
          <div className="option-item" onClick={toggleRating}>Rating</div>
        }
        <div className="option-item" onClick={handleAddOrDeleteCategory}>
          {tags.length > 0 ? "Delete Category" : "Add Category"}
        </div>
      </div>
      {inputVisible && (
        <div className='tag-input-container'>
          <img src="/img/ICON/tag_icon.png" alt="Tag Icon" className="tag-icon" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag(e)}
            placeholder='Add a tag...'
          />
        </div>
      )}
      {tags.length > 0 && (
        <div className='tag-container'>
          {tags.map((tag, index) => (
            <div className='tag' key={index}>
              <img src="/img/ICON/tag_icon.png" alt="Tag Icon" className="tag-icon" />
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default GameCard;