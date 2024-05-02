import React from 'react';
import './GameRank.css';  // 引入 CSS 文件来管理样式
import { useNavigate } from 'react-router-dom';

const RankCard = ({ data }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/Rankingpage`)
    }
    return (
        <div onClick={handleClick} className="rank-card" style={{ background: data.background }}>
            <div className='rank-card-category'>
                <span>{data.category}</span>
            </div>
            <div className='rank-card-right'>
                <p style={{ marginBottom: 20 }}>{data.title}</p>
                <div className='rank-card-content'>
                    {data.games.map((game, index) => (
                        <p key={index}>{game}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

function GameRank({ games }) {
    const rankData = [{
        category: 'Top 10 Most Played Games',
        title: 'Ranking based on total hours played',
        games: ['The Witcher 3: Wild Hunt', 'Cyberpunk 2077 ', 'DOOM Eternal'],
        background: 'linear-gradient(90deg, rgba(253, 166, 112, 0.7) 0%, rgba(124, 218, 218, 0.7) 100%)'
    }, {
        category: 'Top 10 Recently Played Games',
        title: 'Ranking based on the last playtime',
        games: ['DOOM Eternal', 'Apex Legends', 'Tom Clancy\'s Rainbow Six Siege'],
        background: 'linear-gradient(90deg, rgba(161, 189, 177, 0.7) 0%, rgba(102, 82, 99, 0.7) 100%)'
    }, {
        category: 'Top 10 Longest Single Sessions',
        title: 'Ranking based on the longest time spent in a single gaming session.',
        games: ['The Witcher 3: Wild Hunt', 'Cyberpunk 2077 ', 'DOOM Eternal '],
        background: 'linear-gradient(90deg, rgba(117, 117, 117, 0.7) 0%, rgba(5, 5, 5, 0.7) 100%)'
    }, {
        category: 'Top 10 Games by Friends’ Activity',
        title: 'Ranking based on what games are popular among the user\'s friends.',
        games: ['Apex Legends', 'Cyberpunk 2077 ', 'Dark Souls III'],
        background: 'linear-gradient(90deg, rgba(71, 178, 254, 0.7) 0%, rgba(6, 236, 254, 0.7) 100%)'
    },]
    return (
        <div className="rank-list">
            {rankData.map(data => (
                <RankCard key={data.category} data={data} />
            ))}
        </div>
    );
}

export default GameRank;
