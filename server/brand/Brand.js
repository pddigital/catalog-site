const mongoose = require('mongoose');

const Brand = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  displayImg: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Brand', Brand);
