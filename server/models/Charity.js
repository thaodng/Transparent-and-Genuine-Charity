const mongoose = require('mongoose');

const CharitySchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Please fill in registration number'],
    unique: true,
    trim: true,
  },
  charityDisplayName: {
    type: String,
    required: [true, 'Please fill in charity name']
  },
  description: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Charity', CharitySchema);