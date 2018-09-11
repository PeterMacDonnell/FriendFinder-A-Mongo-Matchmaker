
//Required NPMs
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();
var PORT = process.env.PORT || 8080;

//Connecting to the public folder
app.use(express.static(path.join(__dirname, './app/public')));


//Boilerplate code for data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Unnecessary
// app.use(bodyParser.text());


// connecting to necessary files
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);



// Making sure that the application is listening to the server
app.listen(PORT, function() {
    console.log('Friend Finder app is listening on PORT: ' + PORT);
  });