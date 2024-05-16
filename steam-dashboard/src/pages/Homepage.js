import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import './Homepage.css';
import ProfileBackground_big from '../components/ProfileBackground_big.js';
import Header from '../components/Header.js';
import GameGrid from '../components/GameGrid.js';

import GameLibrary from '../components/GameLibrary.js';
import GameRank from '../components/GameRank.js';
import { Link } from 'react-router-dom'; // for logo & ensure its installed
const Homepage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [games, setGames] = useState([]); // 添加状态来存储游戏数据

    console.log('API Base URL:', process.env.REACT_APP_API_BASE);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const username = params.get('steamid');
        // 获取用户信息
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/users_summary.json`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();

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

        // 获取游戏信息
        const fetchGames = async () => {
            console.log("fetchGames in the homepage");
            console.log(`${process.env.REACT_APP_API_BASE}/api/games/${username}`);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/games/${username}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json(); // 直接得到游戏数组
                    console.log("Fetched Games Data:", data);
                    if (username === '76561198856798776') {
                        const initialGameIds = [1091500, 1145360, 292030, 1200110, 1817070, 447530, 1284410, 303310, 1113560, 48190, 33230, 201870, 230410,];
                        // 创建一个新的数组，首先添加 initialGameIds 中的游戏，如果它们存在于 data 中
                        let priorityGames = initialGameIds.map(id => data.find(game => game.appid === id)).filter(game => game !== undefined);
                        // 添加剩余的游戏，排除已在 priorityGames 中的游戏ID
                        let otherGames = data.filter(game => !initialGameIds.includes(game.appid));
                        // 合并两个数组
                        const sortedGames = priorityGames.concat(otherGames);
                        const topGames = sortedGames.slice(0, 100);
                        setGames(topGames);
                    }
                    else {
                        const shuffled = data.sort(() => 0.5 - Math.random());
                        setGames(shuffled.slice(0, 100));
                    }
                } else {
                    console.error('Failed to fetch games:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching games data:', error);
            }
        };

        fetchUserInfo();
        fetchGames();
    }, []);

    const [current, setCurrent] = useState('grid') // grid,rank,library

    const getCurrentPage = () => {
        console.log('current:', current);
        if (current === 'rank') {
            return <GameRank />;
        }
        else if (current === 'library') {
            return <GameLibrary />;
        } else {
            return <GameGrid games={games} setGames={setGames} gamesPerPage={8} />;
        }
    }

    return (
        <div className='background' style={{ display: 'flex', width: '100vw' }}>
            {/* Logo at the top left corner */}
            <Link to="/" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                <img src="/img/ICON/logo.png" alt="Logo" style={{ width: '7.1vw', height: 'auto', padding: '1vw', filter: 'blur(0px) drop-shadow(0vh 0.11vh 0.79vh rgba(0,0,0,0.5))' }} />
            </Link>

            {/* 左半部分 */}
            <div style={{ width: '30vw' }}>
                {showProfile && (
                    <div className="fade-in">
                        <UserProfileCard userInfo={userInfo} />
                    </div>
                )}
            </div>

            {/* 右半部分 */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '70vw', height: '100vh' }}>


                <Header current={current} onChange={(val) => { setCurrent(val) }} />


                {getCurrentPage()}
                {/* Add GameGrid to show the game */}

            </div>
            <ProfileBackground_big />
        </div>
    );
};

export default Homepage;