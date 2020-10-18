const mongoose = require("mongoose");
const db = require("../../db/config.js");

const qualificationsSchema = mongoose.Schema({
  type: String,
  title: String,
  levels: [],
  skill_level: String
});

const Qualification = mongoose.model('Qualification', qualificationsSchema);

module.exports = Qualification;
