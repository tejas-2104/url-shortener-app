const Url = require('../models/urlModel');
const shortid = require('shortid');

// Function to render the home page
exports.getHomePage = (req, res) => {
  res.render('index', { shortUrl: null });
};

// Function to create short URL
exports.createShortUrl = async (req, res) => {
  const originalUrl = req.body.originalUrl;
  const shortUrl = shortid.generate();
  const newUrl = new Url({ originalUrl, shortUrl });

  try {
    await newUrl.save();
    res.render('index', { shortUrl: `http://${req.headers.host}/${shortUrl}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Function to handle redirect to the original URL
exports.redirectToOriginalUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
