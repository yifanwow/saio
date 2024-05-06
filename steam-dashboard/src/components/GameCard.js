import React, { useRef, useEffect, useState } from 'react';
import './GameCard.css'; // 确保你已经引入了CSS文件
import UpdateGameGrid from './UpdateGameGrid';
import Rating from '@mui/material/Rating'; // Import the Rating Component
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import GameRating from './GameRating'; // 导入自定义的评分组件

const StyledRating = styled(Rating)(({ rating }) => ({
  '& .MuiRating-iconFilled': {
    color: 'rgba(255, 255, 255, 0.7)', // 灰白色半透明
    filter: 'blur(0px) drop-shadow(0vh 0.19vh 0.39vh rgba(0,0,0,0.7))', // 添加阴影
    fontSize: '1.5vh',
    margin: '0 0.07vw',
  },
  '& .MuiRating-iconHover': {
    color: 'rgba(255, 255, 255, 0.9)', // 鼠标悬停时稍微增加透明度
    filter: 'drop-shadow(2px 4px 6px black)', // 添加阴影
  },
  '& .MuiRating-iconEmpty': {
    opacity: rating ? 0 : 0.9,// Conditionally setting opacity
    width: rating ? '0px' : 'auto',
    fontSize: '1.5vh',
    color: 'white', // 将颜色改为白色
    filter: 'blur(0px) drop-shadow(0vh 0.19vh 0.50vh rgba(0,0,0,0.9))', // 添加阴影效果
  }
}));

function GameCard({ game, games, setGames }) {
  const params = new URLSearchParams(window.location.search);
  const steamID = params.get('steamid');
  const textRef = useRef(null);
  const [isLongText, setIsLongText] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const defaultDiyGridUrl = 'https://imageforsteamgrid.s3.us-east-2.amazonaws.com/pvz.png';
  const [imageUrl, setImageUrl] = useState(game.diyGrid || game.grid || defaultDiyGridUrl);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(game.rate && game.rate > 0 ? game.rate : null); // 初始化时只在评分大于0时设置评分// State to hold the rating

  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState(game.categories || []); // Assuming categories are passed in the game object
  const [inputValue, setInputValue] = useState('');

  


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onUpdateGrid = (appId, newGridUrl, steamID) => {
    if (!newGridUrl) return; // 如果用户没有输入 URL，不执行任何操作

    //Optimistic Updates for local data to be updates before the server response
    const updatedGames = games.map(g => {
      if (g.appid === game.appid) {
        return { ...g, diyGrid: newGridUrl };
      }
      return g;
    });
    setGames(updatedGames);

    fetch(`${process.env.REACT_APP_API_BASE}/update-grid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newGridUrl, steamID })
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
    //Optimistic Updates for local data to be updates before the server response
    const updatedGames = games.map(g => {
      if (g.appid === game.appid) {
        const { diyGrid, ...rest } = g; // 从对象中解构出 diyGrid 并保留其他属性
        return { ...rest };
      }
      return g;
    });
    setGames(updatedGames);


    fetch(`${process.env.REACT_APP_API_BASE}/clear-grid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: game.appid, steamID }) // Assume steamID is passed to the game object or obtained differently
    })
      .then(response => response.json())
      .then(data => {
        //alert('Custom grid cleared successfully.');
        setImageUrl(game.grid); // Reset the image URL to the default grid
      })
      .catch((error) => {
        console.error('Error:', error);
        //alert('Failed to clear custom grid.');
      });
  };

  // Handler for image load error
  const handleImageError = () => {
    if (imageUrl !== defaultDiyGridUrl) {
      setImageUrl(defaultDiyGridUrl);
      updateGameDiyGrid(game.appid, defaultDiyGridUrl);
    }
  };

  // Function to update game diyGrid URL in the local state and possibly sync with the backend
  const updateGameDiyGrid = (appId, newGridUrl) => {
    const updatedGames = games.map(g => {
      if (g.appid === appId) {
        return { ...g, diyGrid: newGridUrl };
      }
      return g;
    });
    setGames(updatedGames);
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

    const updatedGames = games.map(g => {
      if (g.appid === appId) {
        return { ...g, rate: rate }; // 更新评分
      }
      return g;
    });
    setGames(updatedGames); // 更新状态

    fetch(`${process.env.REACT_APP_API_BASE}/update-rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newRate: rate, steamID })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Update rating response:", data); // 打印响应以调试
        if (rate === -1) {

          setRating(null);  // 当评分被清除时设置为 null
        } else {

          setRating(rate);  // 更新评分
        }
        setRatingVisible(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to update rating.');
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
    const updatedGames = games.map(g => {
      if (g.appid === appId) {
        return { ...g, categories: categories };
      }
      return g;
    });
    setGames(updatedGames); // 更新状态

    fetch(`${process.env.REACT_APP_API_BASE}/update-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid: appId, newCategories: categories, steamID })
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

  useEffect(() => {
    setImageUrl(game.diyGrid || game.grid);
  }, [game.diyGrid, game.grid]);


  return (
    <div className="game-card" onMouseLeave={() => setMenuVisible(false)}>
      <div className="game-image-container">
        <img src={imageUrl} alt={game.name} className="game-image" onError={handleImageError} />
        {tags.length > 0 && (
          <div className='tag-container'>
            {tags.map((tag, index) => (
              <div className='tag' key={index}>
                <img src="/img/ICON/tag_icon.png" alt="Tag Icon" className="tag-icon" />
                {tag}
              </div>
            ))}
          </div>
        )}</div>
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
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              handleChangeRating(newValue);
            }}
            rating={rating}
          /> : rating && <StyledRating
            name="customized-color"
            value={rating}
            readOnly
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            rating={rating}
          />
        }
      </div>

      <div className={`options-menu ${menuVisible ? 'active' : ''}`}>
        <div className="option-item" onClick={handleChangeGrid}>Change Grid Post</div>
        {game.diyGrid && (
          <div className="option-item" onClick={clearCustomGrid}>Clear Grid</div>
        )}
        {rating ?
          <div className="option-item" onClick={handleDeleteRate}>Clear Rating</div> :
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

    </div>
  );
}



export default GameCard;