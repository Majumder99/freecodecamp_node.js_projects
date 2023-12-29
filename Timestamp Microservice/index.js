const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/:date?", (req, res) => {
  let date;
  if (req.params.date) {
    const unixTimestamp = parseInt(req.params.date);
    date = isNaN(unixTimestamp)
      ? new Date(req.params.date)
      : new Date(unixTimestamp);
  } else {
    date = new Date();
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
