const express = require("express");
const {
    getTopics,
    getArticleById,
    handlesInvalidPath,
    handlesInvalidInput
} = require("./controllers/news-controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById)

app.all("/*", handlesInvalidPath);
app.use(handlesInvalidInput);
module.exports = app; 