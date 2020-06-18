const passport = require('passport');
const createError = require('http-errors');

const protected = (req, res, next) => {
  passport.authenticate('jwt', {
    session: false,
  }, async (error, jwtPayload) => {
    if (error || !jwtPayload) {
      return next(new createError(401, 'Token is missing or invalid, please login again to continue'));
    }

    req.user = jwtPayload;
    console.log(req.user);
    next();
  })(req, res, next);
}



module.exports = {
  protected,
};