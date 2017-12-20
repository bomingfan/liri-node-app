


var Twitter = require("twitter");
require("dotenv").config();

var twitterKeys= require("./key.js");

var client = new Twitter(twitterKeys);


var params = {screen_name: 'buyitunesgift'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0 ; i < 20; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
    }
  }
});


