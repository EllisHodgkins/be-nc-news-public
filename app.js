const express = require("express");

const {
    getTopics,
    getArticleById,
    getUsers,
    getArticles,
    getComments
} = require("./controllers/news-controller");

const {
    handlesInvalidPath,
    handlesInvalidInput
} = require("./controllers/error-controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/users", getUsers)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getComments)

app.all("/*", handlesInvalidPath);
app.use(handlesInvalidInput);
module.exports = app; 