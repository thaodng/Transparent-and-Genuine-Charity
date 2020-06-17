const asyncHandler = require('../middleware/async');
const Charity = require('../models/Charity');


exports.createCharity = asyncHandler(async (req, res, next) => {

  const { registrationNumber, charityDisplayName, description, logo } = req.body;

  charity = await Charity.create({
    registrationNumber,
    charityDisplayName,
    description,
    logo
  });

  res.status(200).json({
    success: true,
    data: charity
  });
});
