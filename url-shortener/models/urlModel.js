const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: String,
  shortUrl: String,
  date: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
