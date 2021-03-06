const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// Port 
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Static folder (public)
app.use(express.static("public"));

// Middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoScraper database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/scrape-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/saved-routes.js")(app);

// Start the sever
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
});
