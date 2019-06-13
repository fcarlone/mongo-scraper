const path = require("path");

module.exports = function (app) {
  // Landing page route - loads index.html
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome index page"
    })
  });

  app.get("/saved", function (req, res) {
    console.log('save page')
    // res.sendFile(path.join(__dirname, "../public/saved.html"))
  });

};
