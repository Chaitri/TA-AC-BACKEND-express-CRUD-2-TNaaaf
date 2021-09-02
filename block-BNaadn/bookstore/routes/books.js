const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Category = require('../models/category');

router.get('/', (req, res, next) => {
  Book.find({})
    .populate('author')
    .exec((err, books) => {
      if (err) next(err);
      res.render('listBooks', { books });
    });
});

router.get('/new', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    Category.find({}, (err, categories) => {
      if (err) return next(err);
      res.render('bookForm', { authors: authors, categories: categories });
    });
  });
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect(`/books/`);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  Book.findById(id)
    .populate('author')
    .populate('category')
    .exec((err, book) => {
      if (err) return next(err);
      res.render('bookDetail', { book });
    });
});

module.exports = router;
