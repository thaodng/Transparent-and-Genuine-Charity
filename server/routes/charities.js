const express = require('express');
const router = express.Router();

const { createCharity } = require('../controllers/Charity');

router.route('/').post(createCharity);

module.exports = router;
