const {
    selectTopics
  } = require("../models/news-models");
  
  exports.getTopics = (req, res) => {
    selectTopics().then((topics) => {
        console.log(topics)
        res.status(200).send(topics);
      });
    };