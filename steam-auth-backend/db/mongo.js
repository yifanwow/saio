const Game = require('../models/Games');

async function saveUserGames(steamID, games) {
    try {
        let gameData = await Game.findOne({ steamID });

        if (!gameData) {
            // 如果找不到用户的游戏数据，则创建新条目
            gameData = new Game({ steamID, games });
        } else {
            // 如果找到了用户的游戏数据，更新现有条目，保留特定字段的值
            gameData.games = games.map(newGame => {
                const existingGame = gameData.games.find(g => g.appid === newGame.appid);
                if (existingGame) {
                    // 保留 diyGrid, rating 和 categories 的值（如果存在）
                    return {
                        ...newGame,
                        diyGrid: existingGame.diyGrid ?? newGame.diyGrid,
                        rate: existingGame.rate ?? newGame.rate,
                        categories: existingGame.categories ?? newGame.categories
                    };
                }
                return newGame;
            });
        }

        await gameData.save();
        //console.log('Games data saved successfully for', steamID);
    } catch (err) {
        console.error('Failed to save games data:', err);
    }
}

async function fetchUserGames(steamID) {
    try {
        const gameData = await Game.findOne({ steamID });
        //console.log("Loaded games data:", JSON.stringify(gameData, null, 2)); // 可以用于调试
        return gameData ? gameData.games : [];
    } catch (err) {
        console.error('Failed to fetch games data:', err);
        return [];
    }
}

module.exports = {
    saveUserGames,
    fetchUserGames
};
