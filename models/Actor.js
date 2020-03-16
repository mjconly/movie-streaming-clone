const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: String,
  profile_pic: String
})

const Actor = mongoose.model("Actor", ActorSchema);

module.exports = Actor;
