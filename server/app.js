const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const DB = process.env.DB_URI;
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {console.log("db connected...")})
  .catch((err) => console.log(`${err}`));


app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
})
