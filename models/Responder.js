const mongoose = require("mongoose");

const ResponderSchema = new mongoose.Schema({
  operation_center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "operation_center",
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  name: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  position: {
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

  team: {
    team_id: {
      type: String,
    },

    position: {
      type: String,
    },
  },

  facility: {
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facility",
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
  },

  accesspass: {
    access_id: {
      type: String,
    },
    type: {
      type: String,
    },
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Responder = mongoose.model("responder", ResponderSchema);
