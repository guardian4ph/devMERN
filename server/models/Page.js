const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  picture: {
    type: String,
    required: true,
  },
  background: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Page = mongoose.model("page", PostSchema);
