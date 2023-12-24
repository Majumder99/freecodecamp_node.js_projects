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
  let dateString = req.params.date || Date.now();

  // Check if dateString is a Unix timestamp (numeric)
  const isUnixTimestamp = /^\d+$/.test(dateString);

  // Convert dateString to a number if it's a Unix timestamp
  const timestamp = isUnixTimestamp
    ? Number(dateString)
    : Date.parse(dateString);

  // Check if the timestamp is valid
  if (isNaN(timestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    const date = new Date(timestamp);

    // Now you can send the formatted date as a response
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
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
