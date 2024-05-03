import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import './Homepage.css';
import ProfileBackground_big from '../components/ProfileBackground_big.js';
import Header from '../components/Header.js';
import GameGrid from '../components/GameGrid.js';
import GameLibrary from '../components/GameLibrary.js';
import GameRank from '../components/GameRank.js';
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
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/users_games.json`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    if (username === '76561198856798776') {
                        const initialGameIds = [1091500, 1145360, 1284410, 1200110, 1817070, 12110, 447530, 303310, 1113560];
                        const gamesToShow = data.response.games.filter(game => initialGameIds.includes(game.appid));
                        setGames(gamesToShow);
                    }
                    else {
                        const shuffled = data.response.games.sort(() => 0.5 - Math.random());
                        setGames(shuffled.slice(0, 10));
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
            return <GameGrid games={games} />;
        }
    }

    return (
        <div className='background' style={{ display: 'flex', width: '100vw' }}>
            {/* 左半部分 */}
            <div style={{ width: '50vw' }}>
                {showProfile && (
                    <div className="fade-in">
                        <UserProfileCard userInfo={userInfo} />
                    </div>
                )}
            </div>

            {/* 右半部分 */}
            <div style={{ width: '50vw' }}>
                <div className="fade-in">
                    <Header current={current} onChange={(val) => { setCurrent(val) }} />
                </div>
                <div style={{ marginTop: '0px' }}>
                    {getCurrentPage()}
                </div> {/* Add GameGrid to show the game */}
            </div>
            <ProfileBackground_big />
        </div>
    );
};

export default Homepage;