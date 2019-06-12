const express = require("express");
const mongoose = require("mongoose");
// const axios = require("axios");
// const cheerio = require("cheerio");

// Port 
const PORT = process.env.PORT || 3000;

// Require all models
//  const db = require("./models");

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

// Routes
require("./routes/scrape-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start the sever
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
