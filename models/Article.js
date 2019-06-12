const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Schema constructor
let ArticleSchema = new Schema({
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
const Article = mongoose.model("Article", ArticleSchema);
// Export model
module.exports = Article;
