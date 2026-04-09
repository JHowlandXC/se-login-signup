const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamName: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Team", TeamSchema);