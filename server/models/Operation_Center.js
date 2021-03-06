const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Operation_Center_Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  type: {
    type: String,
  },

  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = OpCen = mongoose.model(
  "operation_center",
  Operation_Center_Schema
);
