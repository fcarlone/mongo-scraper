const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Schema constructor
let SaveSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // Link to Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create model from above Schema
const Save = mongoose.model("Save", SaveSchema);
// Export model
module.exports = Save;
