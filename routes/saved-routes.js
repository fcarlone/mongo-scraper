
// Require all models
const db = require("../models");

module.exports = function (app) {

  // GET route for getting all Saved Articles from MongoDB
  app.get("/saves", function (req, res) {
    console.log('saved-routes')
    db.Save.find({})
      .then(function (dbSave) {
        console.log('saved data - dbSave', dbSave)
        res.json(dbSave)
      })
      .catch(function (err) {
        res.json(err);
      });
  })


  app.post("/saved", function (req, res) {
    db.Save.create(req.body)
      .then(function (dbSave) {
        console.log('saved article', dbSave)
        res.json(dbSave)
      })
  })
}
