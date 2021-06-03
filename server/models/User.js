const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  name: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  rigths: [
    {
      rigths: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  accesspass: {
    access_id: {
      type: String,
    },
    type: {
      type: String,
    },
  },

  opcen: {
    operation_center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "operation_center",
    },
    dateadded: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
