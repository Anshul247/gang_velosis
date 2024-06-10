const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    CIRCLE_UID: Number,
    DIVISION_UID: Number,
    DIVISION_NAME: String
});

module.exports = mongoose.model('Division', divisionSchema);
