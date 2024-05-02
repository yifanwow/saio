import React, { useEffect, useState } from 'react';
import './Rankingpage.css';
import ProfileBackground_big from '../components/ProfileBackground_big.js';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import { useNavigate } from 'react-router-dom';

const Rankingpage = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([]);
    const handleBack = () => {
        navigate(-1)
    }
    // 获取游戏信息
    const fetchGames = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE}/users_games.json`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const shuffled = data.response.games.sort(() => 0.5 - Math.random());
                setGames(shuffled.slice(0, 10));
            } else {
                console.error('Failed to fetch games:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching games data:', error);
        }
    };
    useEffect(() => {
        fetchGames();
    }, []);
    return (
        <div className='background' style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <Toolbar>
                <IconButton sx={{ color: '#ffffff' }} onClick={handleBack}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1, color: '#ffffff' }}
                >
                    Top 10 Most Played Games
                </Typography>
            </Toolbar>
            <div className="ranking-list-container">
                <div className="ranking-list">
                    {games.map(game => (
                        <div className='ranking-game-card'>
                            <img className="ranking-page-game-image" src={game.grid} alt={game.name} />
                            <div className="ranking-page-game-content">
                                <p>{game.name}</p>
                                <p>150 Hours</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ProfileBackground_big />
        </div>
    );
};

export default Rankingpage;