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
  app.post("/delete/:id", function (req, res) {
    db.Save.deleteOne({
      _id: req.params.id
    },
      function (error, removed) {
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          console.log("Note removed from MongoDB", removed)
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

  // POST route for saving a note to an article
  app.post("/saves/:id", function (req, res) {
    console.log('save note req.body', req.body)
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Save.findOneAndUpdate({
          _id: req.params.id
        }, { $push: { note: dbNote._id } }, { new: true })
      })
      .then(function (dbSave) {
        console.log('dbSave note saved', dbSave)
        res.json(dbSave)
      })
      .catch(function (error) {
        res.json(error)
      });
  });

  // POST route to delete note
  app.post("/delete-note/:id", function (req, res) {
    let id = req.params.id;
    db.Note.findOneAndDelete({
      _id: id
    }, function (error, removed) {
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        console.log("Note removed from MongoDB", removed)
        res.send(removed)
      }
      db.Save.updateOne(
        { "$pull": { "note": id } },
        function (error) {
          if (error) {
            console.log(error)
            res.send(error)
          }
        }
      );
    });
  });

}
