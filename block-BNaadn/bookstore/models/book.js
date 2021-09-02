const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  pages: Number,
  publication: Number,
  cover_image: String,
  category: { type: [Schema.Types.ObjectId], ref: 'Category', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});

module.exports = mongoose.model('Book', bookSchema);
