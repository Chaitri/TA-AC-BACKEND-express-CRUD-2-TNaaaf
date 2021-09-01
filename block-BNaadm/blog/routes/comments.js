const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Article = require('../models/article');

// Form to edit comment
router.get('/:id/edit', (req, res, next) => {
  let commentId = req.params.id;
  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment', { comment });
  });
});

// to update comment
router.post('/:id', (req, res, next) => {
  let commentId = req.params.id;
  Comment.findByIdAndUpdate(commentId, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect(`/articles/${updatedComment.articleId}`);
  });
});

// to delete comment
router.get('/:id/delete', (req, res, next) => {
  let commentId = req.params.id;
  Comment.findByIdAndDelete(commentId, (err, deletedComment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      deletedComment.articleId,
      { $pull: { comments: deletedComment.id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect(`/articles/${deletedComment.articleId}`);
      }
    );
  });
});

// controls for like/dislike
router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect(`/articles/${comment.articleId}`);
  });
});

router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect(`/articles/${comment.articleId}`);
  });
});

module.exports = router;
