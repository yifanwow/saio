  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const path = require('path');
  const passport = require('passport');
  const axios = require('axios');
  const { log } = require('console');
  const { saveUserGames, fetchUserGames } = require('./db/mongo');
  // const userGamesDir = path.join(__dirname, 'public', 'users_games');

  router.get('/auth/steam', (req, res, next) => {
    console.log('Initiating Steam authentication');
    passport.authenticate('steam', { failureRedirect: '/' })(req, res, next);
    console.log('Initiating Steam authentication check-point 2');
});

  router.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    async function (req, res) {
      try {
        console.log('steamid: ', req.user._json.steamid);
        console.log('avatar: ', req.user._json.avatarfull);
        const steamID = req.user._json.steamid;
        const apiKey = process.env.STEAM_API_KEY;

        // Fetch games from Steam API or other sources { // If no games found in DB, fetch from Steam and save
        const games = await fetchGamesFromSteamAPI(steamID, apiKey);
        await saveUserGames(steamID, games);
        const gameData = await fetchUserGames(steamID);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const secondsDiff = currentTimestamp - req.user._json.timecreated;
        const daysDiff = Math.floor(secondsDiff / (60 * 60 * 24));
        console.log('days:  ' + daysDiff);

        let gameCount = gameData.length;
        let totalGameHours = calculateTotalHours(gameData);
        totalGameHours = Math.floor(totalGameHours / 60);
        const accountValue = calculateTotalValue(gameData);

        //获取用户信息
        const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamID}`);
        const user = response.data.response.players[0];
        //console.log(user); // Get the first player object

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

  // Example helper functions to calculate total hours and value
  function calculateTotalHours(games) {
    return games.reduce((acc, game) => acc + game.playtime_forever, 0);
  }

  function calculateTotalValue(games) {
    const total = games.reduce((acc, game) => acc + (game.price || 0), 0);
    return Math.ceil(total);
  }

  async function fetchGamesFromSteamAPI(steamID, apiKey) {
    try {
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&include_appinfo=1&format=json`;
      const response = await axios.get(url);
      const games = response.data.response.games;
      const gameIds = games.map(game => game.appid).join(',');

      // 一次性获取所有游戏的价格信息
      const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${gameIds}&filters=price_overview`;
      const detailsResponse = await axios.get(detailsUrl);
      const pricesData = detailsResponse.data;

      const detailedGames = games.map(game => {
        const details = pricesData[game.appid] && pricesData[game.appid].success ? pricesData[game.appid].data : null;
        return {
          ...game,
          price: details && details.price_overview ? details.price_overview.final / 100 : 0, // 添加价格
          grid: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg` // 添加封面图
        };
      });

      return detailedGames;
    } catch (error) {
      console.error('Error fetching games from Steam:', error);
      return [];
    }
  }

  module.exports = router;
