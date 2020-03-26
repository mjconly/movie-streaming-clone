const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  profile_pic: String
})

const Actor = mongoose.model("Actor", ActorSchema);

module.exports = Actor;
