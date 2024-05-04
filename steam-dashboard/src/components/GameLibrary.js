import React from 'react';
import './GameLibrary.css';  // 引入 CSS 文件来管理样式
import { useNavigate } from 'react-router-dom';

const LibraryCard = ({ data }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/Librarypage`)
    }
    return (
        <div onClick={handleClick} className="library-card" style={{ background: data.background }}>
            <div className='library-card-category'>
                <span>{data.category}</span>
            </div>
            <div className='library-card-content'>
                <p>Total Games: {data.totalgames}</p>
                <p>Last Play Time:  {data.lastplaytime}</p>
                <p>Total Time Spent:  {data.totaltimespent}</p>
                <p>Total Size:  {data.totalsize}</p>
            </div>
        </div>
    )
}

function GameLibrary({ games }) {
    const libraryData = [{
        category: 'Action',
        totalgames: 25,
        lastplaytime: 'April 20, 2024',
        totaltimespent: '350 hours',
        totalsize: '200 GB',
        background: 'linear-gradient(90deg, rgba(79, 58, 143, 0.7) 0%, rgba(235, 58, 74, 0.7) 100%)'
    }, {
        category: 'Adventure',
        totalgames: 25,
        lastplaytime: 'April 20, 2024',
        totaltimespent: '350 hours',
        totalsize: '200 GB',
        background: 'linear-gradient(90deg, rgba(188, 132, 95, 0.7) 0%, rgba(129, 85, 69, 0.7) 100%)'

    }, {
        category: 'Role-playing (RPG)',
        totalgames: 25,
        lastplaytime: 'April 20, 2024',
        totaltimespent: '350 hours',
        totalsize: '200 GB',
        background: 'linear-gradient(90deg, rgba(152, 173, 217, 0.7) 0%, rgba(23, 62, 137, 0.7) 100%)'

    }, {
        category: 'Strategy',
        totalgames: 25,
        lastplaytime: 'April 20, 2024',
        totaltimespent: '350 hours',
        totalsize: '200 GB',
        background: 'linear-gradient(90deg, rgba(202, 199, 76, 0.7) 0%, rgba(68, 170, 118, 0.7) 100%)'
    }]
    return (
        <div className="library-list">
            {libraryData.map(data => (
                <LibraryCard key={data.category} data={data} />
            ))}
        </div>
    );
}

export default GameLibrary;
