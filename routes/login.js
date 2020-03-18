const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const router = express.Router();

require("dotenv").config();

let User = require("../models/User");

router.post("/signin", (req, res) => {
  const {email, password} = req.body;

  User.findOne({email: email}, (err, user) => {
    if (err) throw err;

    if (user){
      bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch){
          jwt.sign(
            { id: user.id, name: user.username },
            process.env.ACCESS_TOKEN,
            {expiresIn: 7200}, (err, token) =>{
              if (err) throw err;
              res.json({
                token: token,
                id: user.id,
              })
            }
          )
        }
        else{
          res.status(400).json("Incorrect Password");
        }
      })
      .catch((err) => res.json(err));
    }
    else{
      res.status(400).json("Incorrect email or password");
    }
  })
})




module.exports = router;
