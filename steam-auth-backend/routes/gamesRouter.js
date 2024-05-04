// routes/gamesRouter.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Games'); // 确保这里的路径正确

// 获取指定 Steam ID 的游戏数据
router.get('/games/:steamID', async (req, res) => {
    const steamID = req.params.steamID;
    console.log("Request for Steam ID:", steamID); // 日志输出Steam ID
    try {
        const gameData = await Game.findOne({ steamID });
        if (gameData) {
            res.json(gameData.games);
        } else {
            res.status(404).json({ message: 'No games found for this Steam ID' });
        }
    } catch (error) {
        console.error('In gameRouter.js Failed to fetch games:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
