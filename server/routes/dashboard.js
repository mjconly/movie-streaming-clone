const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const router = express.Router();

const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Review = require("../models/Review");

router.get("/:id", auth, (req, res) => {

  Movie.find()
    .then((movies) => {
      Actor.find()
        .then((actors) => {
          res.json({
            name: req.user.name,
            movies: movies,
            actors: actors
          })
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err));
})


router.post("/review", auth, (req, res) => {
  const posted_by_name = req.user.name;
  const posted_by_id = req.body.userId;
  const posted_for = req.body.movieId;
  const score = req.body.rating;
  const description = req.body.review;

  let newReview = Review({
    posted_by_name,
    posted_by_id,
    posted_for,
    score,
    description
  })

  newReview.save()
    .then((review) => {
      Movie.findOneAndUpdate({_id: posted_for},
        {$push: {reviews: review._id}},
        {new: true, useFindAndModify: false}
      )
        .then((movie) => {
          Review.find({"_id": { $in: movie.reviews} })
            .then((reviews) => {
              res.json({
                reviews
              })
            })
        })
        .catch((err) => {res.json(err)})
    })
    .catch((err) => {res.json(err)})

})

router.get("/:id/reviews", auth, (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      Review.find({"_id": {$in: movie.reviews} })
        .then((reviews) => {
          res.json({
            reviews
          })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

module.exports = router;
