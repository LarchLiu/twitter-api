const express = require('express');
const { oauth, oauthCB } = require('../../middlewares/oauth');
const oauthController = require('../../controllers/oauth.controller');

const router = express.Router();

router.get('/github', oauth('github'));
router.get('/github/callback', oauthCB('github'), oauthController.login);

module.exports = router;
