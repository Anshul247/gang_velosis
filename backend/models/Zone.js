const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    ZONE_UID: Number,
    ZONE_NAME: String
});

module.exports = mongoose.model('Zone', zoneSchema);
