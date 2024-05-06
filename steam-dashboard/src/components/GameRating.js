import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
    opacity: 0.7  // 确保填充的图标稍微透明
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
    opacity: 0.9  // 鼠标悬停时颜色加深
  },
  '& .MuiRating-iconEmpty': {
    display: 'none' // 默认隐藏未选中的图标
  }
});

function GameRating({ initialRating }) {
  const [rating, setRating] = useState(initialRating); // 初始化评分
  const [displayRating, setDisplayRating] = useState(initialRating > 0); // 根据初值决定是否显示

  useEffect(() => {
    // 监听 rating 变化，只有在 rating 大于 0 时才显示
    setDisplayRating(rating > 0);
  }, [rating]);

  const handleChange = (event, newValue) => {
    if (newValue === null) { // 允许用户通过再次点击来清除评分
      setRating(0); // 设置评分为0
    } else {
      setRating(newValue); // 更新评分值
    }
  };

  return (
    <div>
      {displayRating && (
        <StyledRating
          name="customized-rating"
          value={rating}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default GameRating;
