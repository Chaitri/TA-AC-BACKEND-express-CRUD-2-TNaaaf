const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

router.get('/', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render('listAuthors', { authors });
  });
});

router.get('/new', (req, res, next) => {
  res.render('authorForm');
});

router.post('/', (req, res, next) => {
  Author.create(req.body, (err, author) => {
    if (err) return next(err);
    res.redirect('/authors');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  Author.findById(id, (err, author) => {
    if (err) return next(err);
    Book.find({ author: id }, (err, books) => {
      if (err) return next(err);
      res.render('authorDetail', { author: author, books: books });
    });
  });
});

module.exports = router;
