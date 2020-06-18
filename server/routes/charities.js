const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/auth');

const { createCharity, getCharities } = require('../controllers/Charity');

router.route('/')
  .post(createCharity)
  .get(getCharities);

module.exports = router;
