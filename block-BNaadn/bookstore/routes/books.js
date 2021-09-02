const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) next(err);
    res.render('listBooks', { books });
  });
});

router.get('/new', (req, res, next) => {
  res.render('newBookForm');
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect(`/books/${book.id}`);
  });
});

module.exports = router;
