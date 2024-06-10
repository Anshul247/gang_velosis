const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ZONE_UID: Number,
    CIRCLE_UID: Number,
    CIRCLE_NAME: String
});

module.exports = mongoose.model('Circle', circleSchema);
