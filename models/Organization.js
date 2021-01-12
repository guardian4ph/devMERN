const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  logo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Operation = mongoose.model("organization", OrganizationSchema);
