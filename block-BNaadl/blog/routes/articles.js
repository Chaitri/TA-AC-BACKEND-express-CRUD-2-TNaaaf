var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/', function (req, res, next) {
  res.render('articles', { articles });
});

router.get('/new', (req, res, next) => {
  res.render('articleForm');
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  res.render('singleArticle', { article });
});

router.post('/', (req, res, next) => {
  res.send('Article has been saved.');
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  res.render('editArticle', { article });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  res.send('Article has been deleted.');
});

module.exports = router;
