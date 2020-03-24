const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const router = express.Router();

const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

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


router.get("/:id")
module.exports = router;
