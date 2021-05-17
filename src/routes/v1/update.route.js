const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const updateValidation = require('../../validations/update.validation');
const updateController = require('../../controllers/update.controller');

const router = express.Router();

router.get('/', auth(), updateController.getUpdate);
router.post('/', auth('refresh'), validate(updateValidation.postUpdate), updateController.pushUpdate);

module.exports = router;
