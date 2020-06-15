var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success: true,
    data: {
      message: 'Router user ok!'
    }
  })
});

module.exports = router;
