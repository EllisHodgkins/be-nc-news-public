const {
    selectTopics, selectArticleById, selectUsers, selectArticles
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
        }).catch(next);
    }