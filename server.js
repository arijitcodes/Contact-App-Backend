const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

// Importing DB Connection Method from DB Config
const connectDB = require("./config/db");

const app = express();

app.post("/", (req, res) => {
  console.log("Incoming POST Req at / ");
  res.send("Hello World! POST Request Receieved at /");
});
app.get("/", (req, res) => {
  console.log("Incoming GET Req at / ");
  res.send("Hello World! GET Request Receieved at /");
});

// Connecting MongoDB
connectDB();

// Setting up server port
const PORT = process.env.PORT || 5000;

// Starting Server
app.listen(PORT, (err, res) => {
  if (err) {
    console.error(`Error Occured while starting server! ${err}`);
  } else {
    console.log(`Server Started at Port ${PORT}...`);
  }
});
