const express = require('express');
const router = express.Router();

const {
  getManager
} = require('../controllers/Manager');


router.get('/:ethAddress', getManager);

module.exports = router;
