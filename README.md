# Movie Streaming Clone

## Overview
A web appication made with **Mongo Express Node React** that allows a user to create
an account and view popular titles from their home page. Movies can be sorted by
genre or searched by title. Each movie when selected opens a modal window allowing
the user to view relevant movie information and post reviews.

##Details
A python script was created to scrape imdb for popular movie titles and write
this data to a csv file. This file was than used to populate a mongo database. The
React client can than use the Node backend api to make requests and retrieve movie
information. 

## View
To view the application click [here](https://movie-streaming-clone.herokuapp.com/)

## Requirements
1. Node
2. Mongodb

## Installation
1. Download project folder
2. From the terminal navigate to <code> movie-streaming-clone/ </code>
3. Install dependencies with <code> $ npm install </code>
4. **Note** in the app.js file the enviornment variables
DB_URI and ACESS_TOKEN must be assigned. To do this create a .env file in 
the root directiory of the project and add and DB_URI variables:
<br><code> ACCESS_TOKEN=\<your access token\> </code>
<br><code> DB_URI=\<your mongodb Atlas uri with password\> </code>
      
## Run
1. From the terminal navigate to <code> movie-streaming-clone/ </code>
2. Run server with <code> $ node app.js </code>
3. The server will be running on port 4000
4. To run the react server, cd into client and enter <code> $npm start </code>
5. Open browser and navigate to <code> localhost:<port#>/ </code>
6. **NOTE** http://localhost:4000 will need to be added to the start of 
all axios GET and POST requests made from the client react components
