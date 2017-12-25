
// require npm package
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var inquirer = require('inquirer');
var fs = require('fs');

// import keys object 
var keys = require("./key.js");
// use constructor to create new variable twitter and spotify
var twitter = new Twitter(keys.twitterKey);
var spotify = new Spotify(keys.spotifyKey);


// function do-what-it-says
function doWhat () {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    // function commandLine
    commandLine(dataArr[0], dataArr[1]);
  });
}


// taking command line input
var commands = process.argv[2];
var nameArray = process.argv;
var nameString = "";

// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nameArray.length; i++) {
  if (i > 3 && i < nameArray.length) {
    nameString = nameString + "+" + nameArray[i];
  }
  else {
    nameString += nameArray[i];
  }
}
commandLine(commands, nameString);


// function choosing the input in the command line
function commandLine(commands, nameString) {
  if (commands === "my-tweets") {
    myTweets();
  }
  if (commands === "spotify-this-song") {
    if (nameString) {
      spotifyThisSong(nameString);
    } else {
      spotifyThisSong("Ace of Base")
    }
  }
  if (commands === "movie-this") {
    if (nameString) {
      movieThis(nameString);
    } else {
      movieThis("Mr. Nobody.")
    }
  }
  if (commands === "do-what-it-says") {
    doWhat();
  }
}



// twitter function
function myTweets() {
  var params = { screen_name: 'buyitunesgift' };
  twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 20; i++) {
        // twitter text
        console.log("Twitts: " + tweets[i].text);
        // create at date with moment format
        console.log("Date: " + moment(tweets[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format("LLL"));
        console.log("----------------------------------------");
      }
    }
  });
}


// spotify function
function spotifyThisSong(songName) {
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // loop through every item
    for (var i = 0; i < 5; i++) {
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
};


// IMDB function
// Create an variable for holding the movie name
function movieThis(movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover the elements
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Rated);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country of Origin: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
};





