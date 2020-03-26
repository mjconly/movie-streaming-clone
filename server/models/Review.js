const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  posted_by_name: String,
  posted_by_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  posted_for:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  }],
  posted_on: {
    type: Date,
    default: Date.now
  },
  score:{
    type: Number,
    min: 0,
    max: 10
  },
  description: String
})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
