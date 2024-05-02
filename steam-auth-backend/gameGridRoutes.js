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

// Category 
// POST route to update game categories
router.post('/update-categories', async (req, res) => {
  const { appid, newCategories } = req.body;
  const filePath = path.join(__dirname, 'public', 'users_games.json');

  try {
    // Read the existing file
    const jsonData = fs.readFileSync(filePath, 'utf8');
    let gamesData = JSON.parse(jsonData);

    // Find the game and update the categories
    const game = gamesData.response.games.find(game => game.appid === appid);
    if (game) {
      // Here, we assume that the categories are stored in an array.
      // If the game has no categories, initialize it as an empty array.
      game.categories = newCategories || [];

      // Write the updated games data back to the file
      fs.writeFileSync(filePath, JSON.stringify(gamesData, null, 2));
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
