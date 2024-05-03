import React, { useEffect, useState } from 'react';
import './Librarypage.css';
import LibraryGameCard from '../components/LibraryGameCard.js';
import ProfileBackground_big from '../components/ProfileBackground_big.js';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useNavigate } from 'react-router-dom';

const Librarypage = () => {
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
                    Action
                </Typography>
            </Toolbar>
            <div className='library-page-swiper'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={8}
                    loop
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {games.map(game => (
                        <SwiperSlide>
                            <img className="library-page-game-image" src={game.grid} alt={game.name} />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
            <h2 className='library-page-text'>All Action Games (25)</h2>

            <div className="library-game-grid">
                {games.map(game => (
                    // TO do: if needed to have a popup window for next step
                    <LibraryGameCard key={game.appid} game={game} />
                ))}
            </div>
            <ProfileBackground_big />
        </div>
    );
};

export default Librarypage;