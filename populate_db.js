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

async function populate(mongoose, data){
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, async (res, err) => {
    for (let j = 0; j < data.length; j++){
      const {title, poster, description, director, writers, cast, runtime, genres} = data[j];

      const actors_new_to_db = [];
      const actors_for_movie = []
      let currActor = [];

      for (let i = 0; i < cast.length; i++){
        currActor.push(cast[i]);
        if (i % 2 !== 0){
          let newActor = await Actor.findOne({name: currActor[0]});
          if (newActor === null){
            newActor = Actor({
              name: currActor[0],
              profile_pic: currActor[1]
            })
            actors_new_to_db.push(newActor);
          }
          actors_for_movie.push(newActor);
          currActor = [];
        }
      }

      await Actor.insertMany(actors_new_to_db);

      console.log("added actors");

      let newMovie = Movie({
        title,
        poster,
        description,
        director,
        writers,
        cast: actors_for_movie,
        runtime,
        genres
      })

      newMovie.save()
        .then(() => console.log(`${title} added to db`))
        .catch(err => console.log(err));

      }
    })
    .then(() => {
      close_connection(mongoose);
    });
  }


function sleep(ms){
  return new Promise(resolve => {setTimeout(resolve, ms)});
}

async function close_connection(mongoose){
  await sleep(10000);
  console.log("db updated ... closing connection");
  mongoose.connection.close();
  process.exit();
}

async function buildData(){
  csv()
    .fromFile(csv_path)
    .then((json) => {
      const data_objects_array = []
      let count = 1;
      for (obj of json){
        const title = obj.title;
        const poster = obj.poster;
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
          poster,
          description,
          director,
          writers,
          runtime,
          genres,
          cast
        }

        data_objects_array.push(data_object);
      }

      populate(mongoose, data_objects_array);

    })
}

buildData();
