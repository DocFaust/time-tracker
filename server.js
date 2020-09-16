//jshint esversion:8
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const mongoURL = process.env.mongoURL;
const port = process.env.port || 3000;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const eventSchema = new mongoose.Schema({
    // in || out
    description: String,
    time: Date
});

const Event = mongoose.model("event", eventSchema);

app.route("/").get((req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.route("/tracking").post(async (req, res) => {
    const description = req.body.description;
    const date = new Date();

    console.log(date);
    const event = new Event({
        description: description,
        time: date
    });

    await event.save();
    res.send("Saved");
  });
  
app.listen(port, () => {
  console.log("Listening to port " + port);
});

