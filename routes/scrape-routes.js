// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models")

// Routes
module.exports = function (app) {

  // GET route to scrape website
  app.get("/scrape", function (req, res) {
    // Website to scrape
    axios.get("https://www.nytimes.com").then(function (response) {
      // Load website into cheerio
      const $ = cheerio.load(response.data)
      const results = [];

      $("article").each(function (i, element) {
        const headline = $(element).find("h2").text();
        const summary = $(element).find("li").text();
        const link = $(element).find("a").attr("href");
        results.push({
          headline: headline,
          summary: summary,
          link: link
        });
      });
      console.log(results);
    });
  });


};
