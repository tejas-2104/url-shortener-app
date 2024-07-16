const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/', urlController.getHomePage);
router.post('/shorten', urlController.createShortUrl);

module.exports = router;
