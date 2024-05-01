const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// POST route to update game grid URL
router.post('/update-grid', async (req, res) => {
  const { appid, newGridUrl } = req.body;
  const filePath = path.join(__dirname, 'public', 'users_games.json');

  try {
    // Read the existing file
    const jsonData = fs.readFileSync(filePath, 'utf8');
    let gamesData = JSON.parse(jsonData);

    // Find the game and update the grid URL
    const game = gamesData.response.games.find(game => game.appid === appid);
    if (game) {
      game.grid = newGridUrl;
      fs.writeFileSync(filePath, JSON.stringify(gamesData, null, 2));
      res.status(200).send({ message: 'Grid URL updated successfully' });
    } else {
      res.status(404).send({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Failed to update grid URL:', error);
    res.status(500).send({ message: 'Failed to update grid URL' });
  }
});

module.exports = router;
