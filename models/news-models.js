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
    return result.rows;
  });
};
