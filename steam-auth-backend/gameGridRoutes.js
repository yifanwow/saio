const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const app = express();
const Game = require('./models/Games');  // 确保路径是正确的

app.use(express.json());

// POST route to update game grid URL
router.post('/update-grid', async (req, res) => {
  const { appid, newGridUrl, steamID } = req.body; // 现在也需要 steamID

  try {
    // 根据 steamID 和 appid 查找特定的游戏
    const gameData = await Game.findOne({ steamID, 'games.appid': appid });
    if (gameData) {
      const gameToUpdate = gameData.games.find(g => g.appid === appid);
      gameToUpdate.diyGrid = newGridUrl;  // 更新 diyGrid 字段

      await gameData.save();  // 保存更新
      res.status(200).send({ message: 'Grid URL updated successfully' });
    } else {
      res.status(404).send({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Failed to update grid URL:', error);
    res.status(500).send({ message: 'Failed to update grid URL' });
  }
});
// POST route to clear the custom grid URL
router.post('/clear-grid', async (req, res) => {
  const { appid, steamID } = req.body;

  try {
    const gameData = await Game.findOne({ steamID });
    if (!gameData) {
      return res.status(407).send({ message: 'User games data not found' });
    }

    // Find the game and clear the diyGrid URL
    const gameIndex = gameData.games.findIndex(game => game.appid === appid);
    if (gameIndex !== -1 && gameData.games[gameIndex].diyGrid) {
      // Use $unset to remove the diyGrid field
      const unsetField = `games.$.diyGrid`;
      await Game.updateOne({ steamID, "games.appid": appid }, { $unset: { [unsetField]: 1 } });
      res.status(200).send({ message: 'Custom grid URL cleared successfully' });
    } else {
      res.status(409).send({ message: 'Game not found or no custom grid URL to clear' });
    }
  } catch (error) {
    console.error('Failed to clear custom grid URL:', error);
    res.status(500).send({ message: 'Failed to clear custom grid URL' });
  }
});

router.post('/update-rate', async (req, res) => {
  const { appid, newRate, steamID } = req.body;

  try {
    let updateResult;
    if (newRate === -1) {
      updateResult = await Game.updateOne(
        { "steamID": steamID, "games.appid": appid },
        { $unset: { "games.$.rate": "" } }
      );
    } else {
      updateResult = await Game.updateOne(
        { "steamID": steamID, "games.appid": appid },
        { $set: { "games.$.rate": newRate } }
      );
    }

    if (updateResult.modifiedCount === 0) {
      res.status(404).send({ message: 'Game not found' });
    } else {
      res.status(200).send({ message: 'Rating updated successfully' });
    }
  } catch (error) {
    console.error('Failed to update rating:', error);
    res.status(500).send({ message: 'Failed to update rating' });
  }
});
// Hongyang's category feature backend process
router.post('/update-categories', async (req, res) => {
  const { appid, newCategories, steamID } = req.body; // 添加 steamID

  try {
    // 根据 steamID 和 appid 查找特定的游戏
    const gameData = await Game.findOne({ steamID, 'games.appid': appid });
    if (gameData) {
      const gameToUpdate = gameData.games.find(g => g.appid === appid);
      // 这里假设 categories 应当是一个数组
      gameToUpdate.categories = newCategories || [];
      await gameData.save();
      res.status(200).send({ message: 'Categories updated successfully' });
    } else {
      res.status(404).send({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Failed to update categories:', error);
    res.status(500).send({ message: 'Failed to update categories' });
  }
});

module.exports = router;
