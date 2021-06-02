const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Facility_Schema = new Schema({
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
  completeaddress: {
    type: String,
    require: true,
  },

  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },

  contactperson: {
    type: String,
  },
  contactnumber1: {
    type: String,
  },
  contactnumber2: {
    type: String,
  },
  contactnumber3: {
    type: String,
  },
  marker: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Facility = mongoose.model("facility", Facility_Schema);
