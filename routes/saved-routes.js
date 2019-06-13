
// Require all models
const db = require("../models");

module.exports = function (app) {
  app.post("/saved", function (req, res) {
    db.Save.create(req.body)
      .then(function (dbSave) {
        console.log('saved article', dbSave)
        res.json(dbSave)
      })
  })
}
