
// require npm package
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var inquirer = require('inquirer');

// import keys object 
var keys= require("./key.js");
// use constructor to create new variable twit and spoti
var twitter = new Twitter(keys.twitterKey);
var spotify = new Spotify(keys.spotifyKey);

// inquirer function


// twitter function
var params = {screen_name: 'buyitunesgift'};
twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0 ; i < 20; i++) {
      // twitter text
        console.log("Twitts: " + tweets[i].text);
        // create at date with moment format
        console.log("Date: " + moment(tweets[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format("LLL"));
        console.log("----------------------------------------");
    }
  }
});

// spotify function
spotify.search({ type: 'track', query: 'see you again' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    // loop through every item
  for (var i = 0; i < 20; i++) {
    console.log("------------------------------------");
    // loop through the artists array
    for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
      console.log("Artist(s): " + data.tracks.items[i].artists[j].name);
    }
    // print the information
    console.log("Song's Name: " + data.tracks.items[i].name);
    console.log("Preview Link: " + data.tracks.items[i].preview_url);
    console.log("Album: " + data.tracks.items[i].album.name);
  }

});

// IMDB function
// Create an variable for holding the movie name
var movieName = "Titanic";

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover the elements
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country of Origin: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});




