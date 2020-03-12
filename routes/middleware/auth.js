const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token){
    return res.status(401).json("Unauthorized");
  }

  try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = decoded;
    next();
  }
  catch(e){
    res.status(400).json("Bad request");
  }
}

module.exports = auth;
