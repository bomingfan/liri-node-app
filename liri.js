// var client = require("./key.js");

var Twitter = require("twitter");

var client = new Twitter({
    consumer_key: '0Mx6i5M5HhLSd8QiR4ArHr1CI',
    consumer_secret: 'OCVvTgmjbLUVsfAz1GLazTdkRWlDoxeX6EcfsRBhwNYxEt6qxK',
    access_token_key: '247085509-ISaTdwpRy7b5c5wmVMU21QZ1JE6vxnfYUziWzaea',
    access_token_secret: 'ahRhl7fiBbUmREYQN0O7sH1YDZa2zH9zryBCAlGe3Ft51'
  });



var params = {screen_name: 'buyitunesgift'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0 ; i < 20; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
    }
  }
});