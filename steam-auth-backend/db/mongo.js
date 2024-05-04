const Game = require('../models/Games');

async function saveUserGames(steamID, games) {
    try {
        // Check if the user's games already exist
        let gameData = await Game.findOne({ steamID });

        if (!gameData) {
            // If not, create a new entry
            gameData = new Game({ steamID, games });
        } else {
            // 如果找到了，更新现有条目，但保留diyGrid的值
            gameData.games = games.map(newGame => {
                const existingGame = gameData.games.find(g => g.appid === newGame.appid);
                // 如果找到了现有游戏，保持原有的diyGrid，否则使用新的数据
                if (existingGame && existingGame.diyGrid) {
                    return { ...newGame, diyGrid: existingGame.diyGrid };
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
        //console.log("Loaded games data:", JSON.stringify(gameData, null, 2)); // Log the loaded data
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
