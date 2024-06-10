const mongoose = require('mongoose');

const subdivisionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subdivisionID: Number,
    division_id: Number,
    division_name: String,
    subdivision: String
});

module.exports = mongoose.model('Subdivision', subdivisionSchema);
