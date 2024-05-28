
const mongoose = require("mongoose");

 
const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number:{
    type:  String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },  
  status: {
    type: String,
    // required: true,
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  otp: new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    expiry_time: {
        type: String,
        required: true,
    },
  }),
  substation_id: { type: mongoose.Schema.Types.ObjectId 
  },
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
 
