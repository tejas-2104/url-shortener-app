const Url = require('../models/urlModel');
const shortid = require('shortid');

// Function to render the home page
exports.getHomePage = (req, res) => {
  res.render('index');
};

// Function to create short URL
exports.createShortUrl = async (req, res) => {
  const originalUrl = req.body.originalUrl;
  const shortUrl = shortid.generate();
  const newUrl = new Url({ originalUrl, shortUrl });

  try {
    await newUrl.save();
    res.render('index', { shortUrl: `${req.headers.host}/${shortUrl}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
