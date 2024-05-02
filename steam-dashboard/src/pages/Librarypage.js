import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import './Librarypag.css';
import ProfileBackground_big from '../components/ProfileBackground_big.js';
import Header from '../components/Header.js';
import GameGrid from '../components/GameGrid.js';
const Librarypage = () => {


    return (
        <div className='background' style={{ display: 'flex', width: '100vw' }}>
            <div>
                <LibraryHeader />
            </div>
            <div>
                {showProfile && (
                    <div className="fade-in">
                        <UserProfileCard userInfo={userInfo} />
                    </div>
                )}
            </div>

            <div style={{ width: '50vw' }}>
                <div className="fade-in"><Header/></div>
                <div style={{ marginTop: '0px' }}><GameGrid games={games} /> </div> {/* 添加 GameGrid 组件来显示游戏 */}
            </div>
            <ProfileBackground_big />
        </div>
    );
};

export default Librarypage;