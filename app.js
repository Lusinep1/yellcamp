const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/YELL-CAMP");
  console.log("Database Connected");
}

app.set("view eengine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    price: "cheap camping",
  });
  await camp.save();
  res.send(camp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
