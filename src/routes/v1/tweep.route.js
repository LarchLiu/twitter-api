const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const tweepValidation = require('../../validations/tweep.validation');
const tweepController = require('../../controllers/tweep.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTweeps'), validate(tweepValidation.changeTweeps), tweepController.addTweeps)
  .delete(auth('manageTweeps'), validate(tweepValidation.changeTweeps), tweepController.delTweeps)
  .get(auth(), tweepController.getTweeps);

module.exports = router;
