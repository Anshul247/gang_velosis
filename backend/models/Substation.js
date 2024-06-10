const mongoose = require('mongoose');

const substationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subdivisionID: Number,
    subdivision: String,
    sub_station: String
});

module.exports = mongoose.model('Substation', substationSchema);
 
