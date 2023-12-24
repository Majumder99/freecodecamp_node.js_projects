// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
require("dotenv").config();
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  var date = new Date();
  // if the given parameter is a number (timestamp)
  if (/^\d*$/.test(dateString)) {
    date.setTime(dateString);
  }
  // else we just create a new date parsing the string given
  else {
    date = new Date(dateString);
  }

  // Check if the timestamp is valid
  res.set({ "Content-Type": "application/json" });
  if (!date.getTime())
    res.send(JSON.stringify({ error: "Invalid date given" }));
  // else, we send the object with two members (unix and natural)
  else
    res.send(
      JSON.stringify({
        unix: date.getTime(),
        natural: strftime("%B %d, %Y", date),
      })
    );
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
