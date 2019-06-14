
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
  });

  // POST route to save article to MongoDB
  app.post("/saved", function (req, res) {
    db.Save.create(req.body)
      .then(function (dbSave) {
        console.log('saved article', dbSave)
        res.json(dbSave)
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // GET route to delete article from MongoDB
  app.get("/delete/:id", function (req, res) {
    db.Save.remove({
      _id: req.params.id
    },
      function (error, removed) {
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          console.log("removed from MongoDB", removed)
          res.send(removed)
        }
      });
  });

  // GET route for getting specific saved article and populate it with it's note
  app.get("/saves/:id", function (req, res) {
    console.log('save note route')
    db.Save.findOne({
      _id: req.params.id
    })
      .populate("note")
      .then(function (dbSave) {
        res.json(dbSave)
      })
      .catch(function (error) {
        console.log(error)
        res.send(error)
      });
  });

  // POST route for saving
  app.post("/saves/:id", function (req, res) {
    console.log('save note req.body', req.body)
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Save.findOneAndUpdate({}, { $push: { note: dbNote._id } }, { new: true })
      })
      .then(function (dbSave) {
        console.log('dbSave note saved', dbSave)
        res.json(dbSave)
      })
      .catch(function (error) {
        res.json(error)
      });
  });


}
