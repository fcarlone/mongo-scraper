// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// Routes
module.exports = function (app) {

  // GET route to scrape website
  app.get("/scrape", function (req, res) {
    // Website to scrape
    axios.get("https://www.nytimes.com").then(function (response) {
      // Load website into cheerio
      const $ = cheerio.load(response.data)

      $("article").each(function (i, element) {
        // const headline = $(element).find("h2").text();
        // const summary = $(element).find("li").text();
        // const link = $(element).find("a").attr("href");
        // results.push({
        //   headline: headline,
        //   summary: summary,
        //   link: link
        // });
        const result = {};

        // Add data to results object
        result.headline = $(this).find("h2").text();
        result.summary = $(this).find("li").text();
        result.link = $(this).find("a").attr("href");

        // Create a new Article
        db.Article.create(result)
          .then(function (dbArticle) {
            console.log('dbArticle', dbArticle)
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      // Send confirmation message
      res.send("Scrape Complete");
    });
  });


};
