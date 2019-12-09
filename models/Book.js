const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book_title: String,
  book_comments: [{ type: String }],
  comment_count: { type: Number, default: 0 }
});

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;