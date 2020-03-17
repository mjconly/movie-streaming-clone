const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  director: [String],
  writers: [String],
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor"
  }],
  runtime: String,
  genres: [String],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
})

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
