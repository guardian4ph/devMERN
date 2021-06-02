const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team_Schema = new Schema({
  operation_center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "operation_center",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teamleader: {
    type: String,
    require: true,
  },

  deputy: {
    type: String,
  },

  reponders: [
    {
      reponder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "responder",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      lname: {
        type: String,
        required: true,
      },
    },
  ],

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

module.exports = Team = mongoose.model("team", Team_Schema);
