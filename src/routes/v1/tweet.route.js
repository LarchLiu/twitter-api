const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const tweetValidation = require('../../validations/tweet.validation');
const tweetController = require('../../controllers/tweet.controller');

const router = express.Router();

router.get('/', auth(), validate(tweetValidation.getTweets), tweetController.getTweets);

module.exports = router;
