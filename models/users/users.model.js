const mongoose = require('mongoose');

const users = mongoose.Schema({
  name: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  profile_pic: {
    type: String
  }
});

module.exports = mongoose.model('users', users);