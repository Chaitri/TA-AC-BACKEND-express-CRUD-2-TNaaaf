var express = require('express');
var router = express.Router();
const Article = require('../models/article');

/* GET articles listing. */
router.get('/', function (req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', { articles: articles });
  });
});

router.get('/new', (req, res) => {
  res.render('articleForm');
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('singleArticle', { article });
  });
});

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(' ');
  console.log(req.body);
  Article.create(req.body, (err, insertedArticle) => {
    if (err) next(err);
    res.redirect('/articles');
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) next(err);
    article.tags = article.tags.join(' ');
    res.render('editArticle', { article });
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  req.body.tags = req.body.tags.trim().split(' ');
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if (err) next(err);
    res.redirect(`/articles/${id}`);
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    if (err) next(err);
    res.redirect('/articles');
  });
});

// Like/Dislike button controls
router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect(`/articles/${id}`);
  });
});

module.exports = router;
