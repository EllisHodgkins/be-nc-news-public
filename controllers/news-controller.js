const {
    selectTopics, selectArticleById, selectUsers, selectArticles, selectComments, deleteComment, patchVotes
  } = require("../models/news-models");
  
exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({topics});
    })
    .catch(next)};

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id;
    selectArticleById(id).then((article) => {
        res.status(200).send(article[0])
    }).catch(next);
}

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send(users);
    })
    .catch(next)
};

exports.getArticles = (req, res, next) => {
    selectArticles().then((articles) => {
        res.status(200).send(articles)
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
    const id = req.params.article_id;
    selectComments(id).then((comments) => {
        res.status(200).send(comments)
    })
    .catch(next)
};

exports.deleteComment = (req, res, next) => {
    const id = req.params.comment_id;
    deleteComment(id).then((comment) => {
        res.sendStatus(204)
    })
    .catch(next)
}

exports.patchVotes = (req, res, next) => {
    
}