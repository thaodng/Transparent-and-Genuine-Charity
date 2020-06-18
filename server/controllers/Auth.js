const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const asyncHandler = require('../middleware/async');

// @route     POST /api/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  let { email, password, displayName, ethAddress } = req.body;


  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const user = await Manager.create({
    email,
    password,
    displayName,
    ethAddress,
  });

  res.status(200).json({
    success: true,
    user
  });
});


// @route     POST /api/auth/login
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (errMessage, user) => {
    if (errMessage || !user) {
      return next(new createError(400, errMessage));
    }

    sendTokenResponse(200, res, user);
  })(req, res)
};


const sendTokenResponse = (statusCode, res, user) => {
  const payload = {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    ethAddress: user.ethAddress
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET);

  res.status(statusCode).json({
    success: true,
    data: {
      success: true,
      user, // BAD CODE: i'm so lazy right now
      token
    }
  });
}
