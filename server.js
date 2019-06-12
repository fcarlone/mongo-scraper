const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Port 
let PORT = 3000;

// Require all models
const db = require("./models");

// Initialize Express
const app = express();

// Middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static folder (public)
app.use(express.static("public"));

// Connect to Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoScraper database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the sever
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
