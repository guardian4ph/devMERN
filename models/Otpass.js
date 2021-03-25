const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Otpass = mongoose.model("otpass", UserSchema);
