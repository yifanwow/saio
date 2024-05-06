  require('dotenv').config();
  const express = require('express');
  const passport = require('passport');
  const authRoutes = require('./authRoutes');
  const SteamStrategy = require('passport-steam').Strategy;
  const mongoose = require('mongoose');
  const session = require('express-session');
  const cors = require('cors');
  const app = express();
  const path = require('path');
  var bodyParser = require('body-parser');
  const gamesRouter = require('./routes/gamesRouter');
  const gameGridRoutes = require('./gameGridRoutes');


  const corsOptions = {
    origin: [process.env.CORS_ORIGIN, 'http://localhost:3000', 'http://saio.us-east-2.elasticbeanstalk.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  };

  app.use(cors(corsOptions));
  app.use(express.static('public'));
  app.use(express.json());
  // Configure the Steam strategy for use by Passport.

  //application/json
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://yifanovo:771593872yU!@saiodb.hd7aqm8.mongodb.net/';
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.use(bodyParser.json());
  //application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));


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
  app.use(session({
    secret: 'change',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, // Important for HTTP, true requires an HTTPS connection
      httpOnly: true  // Recommended to mitigate the risk of client side script accessing the protected cookie
  }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport authenticated session persistence.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  app.post('/api/logout', (req, res) => {
    console.log('Backend: Logging out');
    if (req.isAuthenticated()) { // Check if the user is logged in
      req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.send({ message: 'Logged out' });
      });
    } else {
      res.status(501).send({ message: 'No user to log out' });
    }
  });
  // Use application-level middleware for common functionality.


  // Initialize Passport and restore authentication state, if any, from the session.

  app.use(authRoutes);
  app.use(gameGridRoutes);
  app.use('/api', gamesRouter); 

  app.get('/api/auth/check', (req, res) => {
    if (req.isAuthenticated()) {  // 如果使用passport.js，isAuthenticated()是一个用来检查用户是否登录的方法
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  });

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
