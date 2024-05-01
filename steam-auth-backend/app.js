require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./authRoutes');
const SteamStrategy = require('passport-steam').Strategy;
const session = require('express-session');
const cors = require('cors');
const app = express();
const path = require('path');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

app.use(express.static('public'));
// Configure the Steam strategy for use by Passport.
passport.use(new SteamStrategy({
    returnURL: process.env.STEAM_RETURN_URL || 'http://localhost:3001/auth/steam/return',
    realm: process.env.STEAM_REALM || 'http://localhost:3001/', 
    apiKey: process.env.STEAM_API_KEY
  },
    function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use application-level middleware for common functionality.
app.use(session({
    secret: 'change',
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

// 在所有API路由之后，提供静态文件
app.use(express.static(path.join(__dirname, '../steam-dashboard/build')));

// 所有未匹配到的路由都会发送前端的index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../steam-dashboard/build', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
