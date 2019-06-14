const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Schema constructor
let NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create model from above Schema
const Note = mongoose.model("Note", NoteSchema);
// Export model
module.exports = Note;
