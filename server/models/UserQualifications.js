const mongoose = require("mongoose");
const db = require("./../../db/config.js");

const userQualificationsSchema = new mongoose.Schema({
  levels: [],
  title: String,
  type: String,
  current_level: String,
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const UserQualification = mongoose.model('UserQualification', userQualificationsSchema);

module.exports = UserQualification;
