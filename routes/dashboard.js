const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const router = express.Router();

const Movie = require("../models/Movie");

router.get("/:id", auth, (req, res) => {

  Movie.find()
    .then((movies) => {
      console.log(movies)
      res.json({
        name: req.user.name,
        movies: movies
      })
    })
    .catch((err) => console.log(err));
})

module.exports = router;
