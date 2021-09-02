const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Book = require('../models/book');
const category = require('../models/category');

router.get('/', (req, res, next) => {
  Category.find({}, (err, categories) => {
    if (err) return next(err);
    res.render('listCategories', { categories });
  });
});

router.get('/new', (req, res, next) => {
  res.render('categoryForm');
});

router.post('/', (req, res, next) => {
  Category.create(req.body, (err, category) => {
    if (err) return next(err);
    res.redirect('/categories');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Category.findById(id, (err, category) => {
    if (err) return next(err);
    Book.find({ category: category.id }, (err, books) => {
      if (err) return next(err);
      res.render('categoryDetail', { books: books, category: category });
    });
  });
});

module.exports = router;
