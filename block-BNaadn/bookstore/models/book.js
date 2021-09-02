const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  pages: Number,
  publication: Number,
  cover_image: String,
  category: { type: [String], required: true },
  author: { type: Schema.Types.ObjectId, required: true },
});

module.exports = bookSchema;
