const asyncHandler = require('../middleware/async');
const Charity = require('../models/Charity');


exports.createCharity = asyncHandler(async (req, res, next) => {
  const { registrationNumber, charityDisplayName, description, logo } = req.body;

  console.log(registrationNumber, charityDisplayName, description, logo);
  // charity = await Charity.create({
  //   registrationNumber,
  //   charityDisplayName,
  //   description,
  //   logo
  // });

  res.status(200).json({
    success: true,
    data: registrationNumber
  });
});
