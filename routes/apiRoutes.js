var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models');

module.exports = app => {
    // Scraping Articles Route -------------------------------------------------------------------------------------------
    app.get('/api/scrape', (req, res) => {
        console.log('scrape');

        db.Article.find({})
            .then(dbArticle => {
                // Create Article Array with the Existing Articles in the Database
                var articleArray = [];
                dbArticle.forEach(article => articleArray.push(article.title));


                axios.get("http://www.echojs.com/").then(function (response) {
                    console.log(response.data,"RESPONSE")
                    //       // Then, we load that into cheerio and save it to $ for a shorthand selector
                    var $ = cheerio.load(response.data);
                    // Now, we grab every h2 within an article tag, and do the following:
                    $("article h2").each(function (i, element) {
                        // Save an empty result object
                        var result = {};

                        // Add the text and href of every link, and save them as properties of the result object
                        result.title = $(this)
                            .children("a")
                            .text();
                        result.link = $(this)
                            .children("a")
                            .attr("href");
                        console.log(result)

                        result.author = $(this)
                            .children("a")
                            .attr("href");
                            result.excerpt = $(this)
                            .children("a")
                            .attr("href");

                        // Create a new Article using the `result` object built from scraping
                        db.Article.create(result)
                            .then(function (dbArticle) {
                                // View the added result in the console
                                console.log(dbArticle);
                            })
                            .catch(function (err) {
                                // If an error occurred, log it
                                console.log(err);
                            });
                    });

                    // Send a message to the client
                    res.send("Scrape Complete");
                });
            });

        // Route for getting all Articles from the db
        app.get("/articles", function (req, res) {
            // TODO: Finish the route so it grabs all of the articles
            db.Article.find({})
                .then(function (dbArticle) {
                    res.json(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurs, send the error back to the client
                    res.json(err);
                });
        });


        

        // POST New Note and Update Article ----------------------------------------------------------------------------------
        app.post('/articles/:id', (req, res) => {
            db.Note.create(req.body)
                .then(dbNote => db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true }))
                .then(dbArticle => res.json(dbArticle))
                .catch(err => res.json(err))
        });

        // DELETE Note and Update Article ------------------------------------------------------------------------------------
        app.delete('/articles/:id/:noteId', (req, res) => {
            db.Note.findByIdAndDelete(req.params.noteId)
                .then(dbNote => db.Article.findOneAndUpdate({ _id: dbNote.articleId }, { $pull: { notes: dbNote._id } }))
                .then(dbArticle => res.json(dbArticle))
                .catch(err => res.json(err))
        });

        // GET Single Note ---------------------------------------------------------------------------------------------------
        app.get('/notes/:id', (req, res) => {
            db.Note.findOne({ _id: req.params.id })
                .then(dbNote => res.json(dbNote))
                .catch(err => res.json(err))
        });

        // POST (UPDATE) a Single Note ---------------------------------------------------------------------------------------
        app.post('/notes/:id', (req, res) => {
            db.Note.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    title: req.body.title,
                    body: req.body.body,
                    updated: Date.now()
                }
            })
                .then(dbNote => res.json(dbNote))
                .catch(err => res.json(err))
        })
    })};