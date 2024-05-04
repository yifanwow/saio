const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  steamID: { type: String, required: true, index: true }, // Index for faster query performance
  games: [{
    appid: { type: Number, required: true },
    name: String,
    playtime_forever: Number,
    img_icon_url: String,
    playtime_windows_forever: Number,
    playtime_mac_forever: Number,
    playtime_linux_forever: Number,
    playtime_deck_forever: Number,
    rtime_last_played: Number,
    playtime_disconnected: Number,
    price: Number,
    grid: String,
    diyGrid: String,
  }]
});

module.exports = mongoose.model('Game', GameSchema);
