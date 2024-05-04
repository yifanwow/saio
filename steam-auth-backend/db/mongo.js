    const Game = require('../models/Games');

    async function saveUserGames(steamID, games) {
    try {
        // Check if the user's games already exist
        let gameData = await Game.findOne({ steamID });

        if (!gameData) {
        // If not, create a new entry
        gameData = new Game({ steamID, games });
        } else {
        // If exists, update the existing entry
        gameData.games = games;
        }

        await gameData.save();
        console.log('Games data saved successfully for', steamID);
    } catch (err) {
        console.error('Failed to save games data:', err);
    }
    }

    async function fetchUserGames(steamID) {
        try {
          const gameData = await Game.findOne({ steamID });
          console.log("Loaded games data:", JSON.stringify(gameData, null, 2)); // Log the loaded data
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
