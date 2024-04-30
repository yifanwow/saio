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
      await fetchUserparsedData(steamID, apiKey);
      const { gameCount, accountValue, totalGameHours } = await fetchUserAccountData(steamID, apiKey);


      // const responseAccount = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`);
      // console.log(responseAccount.data);
      // if (responseAccount.data && responseAccount.data.response && responseAccount.data.response.players && responseAccount.data.response.players.length > 0) {
      //   accountValue = responseAccount.data.response.players[0].wallet_balance; // Assuming wallet_balance represents the account value
      //   console.log('Account value:', accountValue);
      // }


      // Save user data to session by add data to the json file.


      //获取用户信息
      const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamID}`);
      const user = response.data.response.players[0];
      console.log(user); // Get the first player object

      //检查本地是否已经有数据文件
      const filePath = path.join(__dirname, 'public', 'users_summary.json'); // 确保路径正确
      //如果没有 则创建一个空的文件
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ users: [] }));
        console.log('Created users_summary.json file.');
      }
      // 读取数据文件

      const jsonData = fs.readFileSync(filePath, 'utf8');
      let parsedData = JSON.parse(jsonData);
      // Ensure that 'users' property exists in the parsed data
      const existingUserIndex = parsedData.users.findIndex(user => user.steamid === steamID);
      console.log('existingUserIndex:  ' + existingUserIndex);
      console.log('date:  ' + daysDiff, 'gameCount:  ' + gameCount, 'totalGameHours:  ' + totalGameHours, 'accountValue:  ' + accountValue);


      if (existingUserIndex === -1) {
        const newUser = {
          ...user,
          date: daysDiff,
          gameCount: gameCount,
          totalGameHours: totalGameHours,
          accountValue: accountValue
        };
        parsedData.users.push(newUser);
        console.log('New user added successfully!!');
      } else {
        // Update user data if the user exists
        parsedData.users[existingUserIndex] = {
          ...parsedData.users[existingUserIndex],
          date: daysDiff,
          gameCount: gameCount,
          totalGameHours: totalGameHours,
          accountValue: accountValue
        };
        console.log('User data updated successfully.');
      }

      // Write the updated user data back to users_summary.json file
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
      res.redirect(process.env.FRONTEND_URL + `home?steamid=${encodeURIComponent(steamID)}`);

    } catch (error) {
      console.error('Error fetching additional user data:', error);
    }


  });


async function fetchUserAccountData(steamID, apiKey) {
  let gameCount = 0;
  let accountValue = 0;
  let totalGameHours = 0;
  const userGameIdsData = fs.readFileSync('./public/users_games.json', 'utf8');

  try {
    const filePath = path.join(__dirname, 'public', 'users_games.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    let parsedData = JSON.parse(jsonData);
    gameCount = parsedData.response.game_count;

    // Ensure that 'response' and 'games' properties exist in the parsed data
    if (parsedData.response && Array.isArray(parsedData.response.games)) {
      // Modify each game object to add a 'price' property
      parsedData.response.games.forEach(game => {
        // Assuming game is an object and you want to add a price property to it
        const gameId = game.appid;
        game.price = 0; // Assume all games are free
        game.grid = 'https://steamcdn-a.akamaihd.net/steam/apps/' + gameId + '/library_600x900_2x.jpg';
      });

      // Write the modified data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
      console.log('All games updated with price tag in users_games.json');
    } else {
      console.error('Error: Invalid data structure in users_games.json');
    }

    // Get game prices from the Steam API

    const gameIds = JSON.parse(jsonData).response.games.map(game => game.appid);
    const gameIdsParam = gameIds.join(',');

    const filters = 'price_overview';
    const response = await axios.get('https://store.steampowered.com/api/appdetails', {
      params: {
        appids: gameIdsParam,
        filters: filters
      }
    });
    if (response.status === 200) {
      const gamePrices = response.data;

      // Update game prices in the parsedData object
      parsedData.response.games.forEach(game => {
        const gameId = game.appid;
        const playtime = game.playtime_forever;
        totalGameHours = totalGameHours + playtime;
        if (gamePrices[gameId] && gamePrices[gameId].data && gamePrices[gameId].data.price_overview && gamePrices[gameId].data.price_overview.final) {
          const gamePrice = gamePrices[gameId].data.price_overview.final;
          game.price = gamePrice; // Update the price property of the game
          accountValue = accountValue + gamePrice;
          console.log(`Game ${gameId} price:`, gamePrice);
        } else {
          console.log(`No price data found for game ${gameId}`);
        }
      });

      // Write the modified parsedData object back to the file
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
      console.log('Game prices updated and saved to users_games.json');
    } else {
      console.error('Error fetching game prices: Unexpected status code', response.status);
    }

    console.log('Account value:', accountValue);

  } catch (error) {
    console.error('Error fetching additional user data:', error);
  }
  totalGameHours = Math.floor(totalGameHours / 60);
  return { gameCount, accountValue, totalGameHours };

}


async function fetchUserparsedData(steamID, apiKey) {
  try {
    console.log(`Requesting games for steamID ${steamID} from Steam API: https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&include_appinfo=1&format=json`);
    const responseGames = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`, {
      params: {
        key: apiKey,
        steamid: steamID,
        include_appinfo: 1,
        format: 'json'
      }
    });

    if (responseGames.data && responseGames.data.response) {
      const parsedDataFilePath = path.join(__dirname, 'public', 'users_games.json');
      if (!fs.existsSync(parsedDataFilePath)) {
        // If the file doesn't exist, create an empty file with the same name
        fs.writeFileSync(parsedDataFilePath, '{}');
        console.log('Created empty users_games.json file.');
      }
      fs.writeFileSync(parsedDataFilePath, JSON.stringify(responseGames.data));
      console.log('User game list stored successfully.');
    } else {
      console.error('Failed to fetch user game list: Invalid response data');
    }
  } catch (error) {
    console.error('Error fetching user game list:', error);
  }
}

module.exports = router;
