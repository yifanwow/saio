const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const axios = require('axios'); // Import Axios for HTTP requests
const { log } = require('console');

router.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async function (req, res) {
    try {
      // Successful authentication, redirect home.
      console.log('steamid:  ' + req.user._json.steamid);
      console.log('avatar:  ' + req.user._json.avatarfull);
      //console.log(req.user._json.created);

      const username = req.user.displayName || 'User'; // Fallback to 'User' if displayName is not available
      // In your /auth/steam/return route
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const secondsDiff = currentTimestamp - req.user._json.timecreated;
      const daysDiff = Math.floor(secondsDiff / (60 * 60 * 24));
      console.log('days:  ' + daysDiff);

      const steamID = req.user._json.steamid;
      const apiKey = process.env.STEAM_API_KEY;

      const { gameCount, accountValue, totalGameHours } = await fetchUserAccountData(steamID);


      // const responseAccount = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`);
      // console.log(responseAccount.data);
      // if (responseAccount.data && responseAccount.data.response && responseAccount.data.response.players && responseAccount.data.response.players.length > 0) {
      //   accountValue = responseAccount.data.response.players[0].wallet_balance; // Assuming wallet_balance represents the account value
      //   console.log('Account value:', accountValue);
      // }


      // Save user data to session by add data to the json file.
      req.session.user = {
        username: req.user.displayName,
        avatarUrl: req.user._json.avatarfull,
        date: daysDiff,
        gameCount: gameCount,
        totalGameHours: totalGameHours,
        //registerDate: calculateRegisterDate(req.user._json.created)
      };
      fetchUserGameList(steamID, apiKey);
      const filePath = path.join(__dirname, 'public', 'data.json'); // 确保路径正确
      fs.writeFile(filePath, JSON.stringify(req.session.user), (err) => {
        if (err) {
          console.error('Failed to write user data to JSON file:', err);
        } else {
          console.log('User data updated successfully.');
        }
        res.redirect(`http://localhost:3000/home?username=${encodeURIComponent(username)}`);
      });
    } catch (error) {
      console.error('Error fetching additional user data:', error);
    }


  });


async function fetchUserAccountData(steamID) {
  const apiKey = process.env.STEAM_API_KEY;
  let gameCount = 0;
  let accountValue = 0;
  let totalGameHours = 0;

  try {
    const responseGames = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1`, {
      params: {
        key: apiKey,
        steamid: steamID
      }
    });

    if (responseGames.data && responseGames.data.response) {
      // Get game count
      gameCount = responseGames.data.response.game_count;
      console.log('Game count:', gameCount);

      // Calculate total game hours
      if (responseGames.data && responseGames.data.response && responseGames.data.response.total_count > 0) {
        totalGameHours = responseGames.data.response.games.reduce((acc, game) => acc + game.playtime_forever, 0);
        totalGameHours = Math.floor(totalGameHours / 60);
        console.log('Total game hours:', totalGameHours);
      }
      // Get game prices

      const appId = 113020;
      const responseGamePrices = await axios.get(`https://store.steampowered.com/api/appdetails`, {
        params: {
          appids: appId
        }
      });
      // Add each game's price to the account value
      if (responseGamePrices.data && responseGamePrices.data[appId] && responseGamePrices.data[appId].data && responseGamePrices.data[appId].data.price_overview && responseGamePrices.data[appId].data.price_overview.final) {
        const gamePrice = responseGamePrices.data[appId].data.price_overview.final;
        accountValue += gamePrice;
        console.log('Game price:', gamePrice);
      } else {
        console.error('Failed to fetch game price: Invalid response data');
      }


      console.log('Account value:', accountValue);
    }
  } catch (error) {
    console.error('Error fetching additional user data:', error);
  }

  return { gameCount, accountValue, totalGameHours };

}


async function fetchUserGameList(steamID, apiKey) {
  try {
    const responseGames = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}`);
    if (responseGames.data && responseGames.data.response) {
      const gameIDs = responseGames.data.response.games.map(game => game.appid);
      // 将游戏 App ID 存储到 JSON 文件中
      const filePath = path.join(__dirname, 'public', 'user_games.json');
      fs.writeFileSync(filePath, JSON.stringify(gameIDs));
      console.log('User game list stored successfully.');
    } else {
      console.error('Failed to fetch user game list: Invalid response data');
    }
  } catch (error) {
    console.error('Error fetching user game list:', error);
  }
}



module.exports = router;
