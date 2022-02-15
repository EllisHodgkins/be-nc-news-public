const {
    selectTopics, selectArticleById
  } = require("../models/news-models");
  
exports.getTopics = (req, res, err) => {
    selectTopics().then((topics) => {
        res.status(200).send({topics});
    })
    .catch((err) => {
        console.log(err)
    })
    };

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id;
    selectArticleById(id).then((article) => {
        res.status(200).send({article})
    }).catch(next);
}


    //error handling


    exports.handlesInvalidInput = (err, req, res, next) => {
        if (err.status && err.msg) {
            res.status(err.status).send({msg: err.msg})
        } else {
            next(err)
        }
    }

    exports.handlesInvalidPath = (req, res) => {
        res.status(404).send({msg : "404 - path not found"})
    }
