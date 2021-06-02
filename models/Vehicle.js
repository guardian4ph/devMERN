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
  make: {
    type: String,
  },
  yearmodel: {
    type: String,
    require: true,
  },

  petroltype: {
    type: String,
  },
  marker: {
    type: String,
  },

  photos: [
    {
      type: String,
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Team = mongoose.model("team", Team_Schema);
