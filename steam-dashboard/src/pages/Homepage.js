import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import './Homepage.css'; // 导入 Homepage 组件的 CSS 文件
import ProfileBackground_big from './../components/ProfileBackground_big.js';

const Homepage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/users_summary.json',{
          method: 'GET',
          headers: {
            'Origin': 'http://localhost:3000',
          }
        });
        if (response.ok) {
          const data = await response.json();
          const params = new URLSearchParams(window.location.search);
          const username = params.get('steamid');
          console.log('userID: ', username);
          const userData = data.users.find(user => user.steamid === username);
          setUserInfo(userData);
          console.log('User data fetched successfully:', userData);
          setShowProfile(true);
        } else {
          console.log('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className='background'> { }
        <ProfileBackground_big />
      {/* 使用 showProfile 状态来控制是否渲染 UserProfileCard */}
      {showProfile && (
        <div className="fade-in">
          <UserProfileCard userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};

export default Homepage;
