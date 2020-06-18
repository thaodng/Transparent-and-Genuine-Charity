const Manager = require('../models/Manager');
const asyncHandler = require('../middleware/async');

// @route     GET /api/managers/:ethAddress
// @access    Public
exports.getManager = asyncHandler(async (req, res, next) => {
  const manager = await Manager.findOne({
    ethAddress: req.params.ethAddress
  }).select('-password');

  if (!manager) {
    return next(new createError(404, 'Manager not found or has been locked'));
  }

  res.status(200).json({
    success: true,
    manager
  });
})

