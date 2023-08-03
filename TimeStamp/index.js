// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  if(req.params.date) { //if a date is entered
    let date = /^\d+$/g.test(req.params.date) ? new Date(Number(req.params.date)) : new          Date(req.params.date); //conditionally sets the date if its only numbers or not
    if(date == "Invalid Date") { //if date cannot be parsed by new Date
      res.json({error: date.toUTCString()}); 
    } else { //otherwise
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  } else { //left empty therefore /api/, must now return current date/time
    let currentMilli = Date.now();
    let currentDate = new Date(currentMilli); 
    res.json({unix: currentMilli, utc: currentDate.toUTCString()});
  }
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
