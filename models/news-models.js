const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.selectArticleById = (id) => {
  if (isNaN(id))
    return Promise.reject({status: 400, msg: "400 - article ID must be a number!"});
  
  return db.query(`SELECT * FROM articles WHERE article_id = ${id};`).then((result) => {
    const article = result.rows;
    if(article.length === 0) {
      return Promise.reject({status: 404, msg: "404 - article not found"}); 
    }
    console.log(result.rows,'modelllllllllll')
    return result.rows;
  })
};

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    const userArray = []
    const users = result.rows
    users.map(user => {
      userArray.push( {username : user.username })
    })
    return userArray;
  });
};

exports.selectArticles = () => {
  return db.query(`SELECT * FROM articles ORDER BY created_at DESC;`).then((result) => {
    const articles = result.rows;
    const mappedArticles = []
    if(articles.length === 0) {
      return Promise.reject({status: 404, msg: "404 - No articles"}); 
    }
    articles.map(article => {
      mappedArticles.push({author: article.author, title: article.title, article_id: article.article_id, topic: article.topic, created_at: article.created_at, votes: article.votes})
    })
    return mappedArticles;
  });
};

exports.selectArticleById = (id) => {
  if (isNaN(id))
    return Promise.reject({status: 400, msg: "400 - Does not match article ID type!"});
  
  return db.query(`SELECT * FROM articles WHERE article_id = ${id};`).then((result) => {
    const article = result.rows;
    if(article.length === 0) {
      return Promise.reject({status: 404, msg: "404 - article not found"}); 
    }
    return result.rows;
  })
};

exports.selectComments = (id => {
  if (isNaN(id))
    return Promise.reject({status: 400, msg: "400 - article ID must be a number!"});

    return db.query(`SELECT * FROM comments WHERE article_id = ${id};`).then((result) => {
      const comment = result.rows;
      if(comment.length === 0) {
        return Promise.reject({status: 404, msg: "404 - article not found"}); 
      }
      return result.rows;
    })
})

exports.deleteComment = (id => {
  if (isNaN(id))
    return Promise.reject({status: 400, msg: "400 - comment ID must be a number!"});

    return db.query(`DELETE FROM comments WHERE comment_id = ${id};`)
    });

