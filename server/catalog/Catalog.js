const mongoose = require('mongoose');

const Catalog = mongoose.Schema({
  catalogName: {
    type: String,
    required: true
  },
  pubDate: {
    type: Date,
    required: true
  },
  catalogThumb: {
    type: String,
    required: true
  },
  catalogLink: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Catalog', Catalog);
