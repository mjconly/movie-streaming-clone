const mongoose = require("mongoose");
const csv = require("csvtojson");
const path = require("path")

require("dotenv").config();

console.log("running db script...")

const Movie = require("./models/Movie");
const Actor = require("./models/Actor");

const csv_path = path.resolve(__dirname, ("./movie_data.csv"))
const DB = process.env.DB_URI;

const p1 = /\[*\]*/gi;
const p2 = /, /gi;
const p3 = /'(.*?)'/gi;

const data_objects_array = []


csv()
  .fromFile(csv_path)
  .then((json) => {
    let count = 1;
    for (obj of json){
      const title = obj.title;
      const description = obj.description;
      const director = [];
      const writers = [];
      const cast = [];
      const runtime = obj.runtime;
      const genres = [];

      //parse directors out
      let dir = obj.director;
      dir = dir.replace(p1, "");
      dir = dir.replace(p2, "");
      for (let name of dir.split(p3)){
        if (name !== ""){
          director.push(name);
        }
      }

      //parse writers out
      let writer = obj.writers;
      writer = writer.replace(p1, "");
      writer = writer.replace(p2, "");
      for (let name of writer.split(p3)){
        if (name !== ""){
          writers.push(name);
        }
      }

      //parse genres out
      let genre = obj.genre;
      genre = genre.replace(p1, "");
      genre = genre.replace(p2, "");
      for (let name of genre.split(p3)){
        if (name !== ""){
          genres.push(name);
        }
      }

      //parse cast out
      let actors = obj.cast;
      actors = actors.replace(p1, "");
      actors = actors.replace(p2, "");
      for (let name of actors.split(p3)){
        if (name !== "" && name.length > 2){
          if (name === "\"Lupita Nyong"){
            cast.push("Lupita Nyong'o")
          }
          else{
            cast.push(name);
          }
        }
      }

      const data_object = {
        title,
        description,
        director,
        writers,
        runtime,
        genres,
        cast
      }

      data_objects_array.push(data_object);

    }

    console.log(data_objects_array)

    process.exit();

  })




// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }, (err, db) => {
//   if (err) throw err;
//
//   csv()
//     .fromFile(csv_path)
//     .then((json) => {
//       let count = 1;
//       for (obj of json){
//         const title = obj.title;
//         const description = obj.description;
//         const director = [];
//         const writers = [];
//         const cast = [];
//         const runtime = obj.runtime;
//         const genres = [];
//
//         //parse directors out
//         let dir = obj.director;
//         dir = dir.replace(p1, "");
//         dir = dir.replace(p2, "");
//         for (let name of dir.split(p3)){
//           if (name !== ""){
//             director.push(name);
//           }
//         }
//
//         //parse writers out
//         let writer = obj.writers;
//         writer = writer.replace(p1, "");
//         writer = writer.replace(p2, "");
//         for (let name of writer.split(p3)){
//           if (name !== ""){
//             writers.push(name);
//           }
//         }
//
//         //parse genres out
//         let genre = obj.genre;
//         genre = genre.replace(p1, "");
//         genre = genre.replace(p2, "");
//         for (let name of genre.split(p3)){
//           if (name !== ""){
//             genres.push(name);
//           }
//         }
//
//         //parse cast out
//         let actors = obj.cast;
//         actors = actors.replace(p1, "");
//         actors = actors.replace(p2, "");
//         for (let name of actors.split(p3)){
//           if (name !== "" && name.length > 2){
//             if (name === "\"Lupita Nyong"){
//               cast.push("Lupita Nyong'o")
//             }
//             else{
//               cast.push(name);
//             }
//           }
//         }
//
//         const data_object = {
//           title,
//           description,
//           director,
//           writers,
//           runtime,
//           genres,
//           cast
//         }
//         console.log(data_object);
//       }
//
//     })
//
// })

// let words = str.replace(/\[*\]*/gi, "");
// words = words.replace(/, /gi, "")
// console.log(words);
// console.log(words.split(/'(.*?)'/gi));
