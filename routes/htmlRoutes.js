var db = require('../models');

module.exports = app => {

  // GET Homepage Route ------------------------------------------------------------------------------------------------
  app.get('/', (req, res) => res.render('index'));

  // GET Articles Route ------------------------------------------------------------------------------------------------
  app.get('/articles', (req, res) => {
    db.Article.find({})
      .then(dbArticle => {
        if (dbArticle.length === 0) {
          res.render('index', {message: 'No Articles to Display...'})
        } else {
          res.render('index', {articles: dbArticle})
        }
      })
      .catch(err => res.json(err))
  });

  // GET One Article and it's accompanying (using populate) Note -------------------------------------------------------
  app.get('/articles/:id', (req, res) => {
    db.Article.findOne({_id: req.params.id})
      .populate('notes')
      .then(dbArticle => {
        console.log({article: dbArticle});
        res.render('article', {article: dbArticle})
      })
      .catch(err => res.json(err))
  });

};