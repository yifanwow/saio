import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';

const Homepage = () => {
  const [userInfo, setUserInfo] = useState(null);

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
    <div>
      {userInfo && <UserProfileCard userInfo={userInfo} />}
    </div>
  );
};

export default Homepage;
