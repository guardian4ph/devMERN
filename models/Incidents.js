const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Incident_Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  marker: {
    type: String,
    required: true,
  },
  completeaddress: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  city: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Incident = mongoose.model("incident", Incident_Schema);
