const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please fill in email'],
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid!!']
  },
  password: {
    type: String,
    required: [true, 'Password cant empty!!!']
  },
  displayName: {
    type: String,
    required: [true, 'Please fill in your name']
  },
  ethAddress: {
    type: String,
    required: [true, 'Ethereum address cant empty!!!']
  },
  avatar: {
    type: String,
    default: 'https://my-final-project-ptudwnc.s3-ap-southeast-1.amazonaws.com/firefly_by_guweiz_d9kjcqt-fullview.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('Manager', ManagerSchema);