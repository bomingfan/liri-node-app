


var Twitter = require("twitter");
var Spotify = require('node-spotify-api')

var keys= require("./key.js");

var twit = new Twitter(keys.twitterKey);
var spoti = new Spotify(keys.spotifyKey);


var params = {screen_name: 'buyitunesgift'};
twit.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0 ; i < 20; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
    }
  }
});

spoti.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items); 
});


