const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/:date?", (req, res) => {
  let date;

  // Check if a date parameter was provided
  if (req.params.date) {
    // Check if the date parameter is a valid number (Unix timestamp)
    const unixTimestamp = parseInt(req.params.date);
    if (!isNaN(unixTimestamp)) {
      date = new Date(unixTimestamp);
    } else {
      // Handle non-numeric date strings
      date = new Date(req.params.date);
    }
  } else {
    // No date parameter, use current date
    date = new Date();
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
