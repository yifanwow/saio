const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const passport = require('passport');

router.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
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
    req.session.user = {
      username: req.user.displayName,
      avatarUrl: req.user._json.avatarfull,
      date: daysDiff,
      //registerDate: calculateRegisterDate(req.user._json.created)
    };

    
    const filePath = path.join(__dirname, 'public', 'data.json'); // 确保路径正确
    fs.writeFile(filePath, JSON.stringify(req.session.user), (err) => {
      if (err) {
        console.error('Failed to write user data to JSON file:', err);
      } else {
        console.log('User data updated successfully.');
      }
      res.redirect(`http://localhost:3000/home?username=${encodeURIComponent(username)}`);
    });
    
  });

module.exports = router;
