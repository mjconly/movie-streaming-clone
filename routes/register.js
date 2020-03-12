const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();


const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("Register Page");
})


router.post("/add", (req, res) => {
  const {username, email, password, confirm_password} = req.body;

  if (password.length < 6){
    return res.status(403).json("password must be at least 6 characters long");
  }

  if (password !== confirm_password){
    return res.status(403).json("Passwords do not match");
  }

  let newUser = User({
    username,
    email,
    password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      newUser.password = hash;

      newUser.save()
        .then((user) => {
          jwt.sign(
            { id: user.id, name: user.username },
            process.env.ACCESS_TOKEN, { expiresIn: 7200 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: user,
              })
          })
        })
        .catch((err) => {
          let errorMessage = "";
          if (err.name === "MongoError"){
            errorMessage = "That email is not avaliable";
          }
          else{
            let fields = [];
            console.log(err);
            for (let field in err.errors){
              fields.push(field);
            }
            errorMessage = err.errors[fields[0]].message;
          }
          res.status(503).json(`${errorMessage}`);
        })

    })
  })
})

module.exports = router;
