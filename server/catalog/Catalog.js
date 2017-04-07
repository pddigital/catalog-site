const mongoose = require('mongoose');

const Catalog = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
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
    catalogPdf: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Catalog', Catalog);