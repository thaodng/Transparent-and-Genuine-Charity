const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please fill in username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password cant empty!!!!']
  },
  ethAddress: {
    type: String,
    required: [true, 'Please fill in ethAddress']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Manager', ManagerSchema);