var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


//scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 7000;

// Use Morgan Logger for Logging Requests
app.use(logger('dev'));
// Use Body-Parse for handling form submissions.
app.use(bodyParser.urlencoded({extended: true}));
// Use Express.static to serve up the public folder as a static directory.
app.use(express.static(__dirname + '/public'));

// Establishing Handlebars as the Templating Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

//connect MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/protected-dusk-59622";
mongoose.connect(MONGODB_URI);

// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("http://www.echojs.com/").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $("article h2").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this)
//           .children("a")
//           .text();
//         result.link = $(this)
//           .children("a")
//           .attr("href");
//           console.log(result)
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//           });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
//   });
  
//   // Route for getting all Articles from the db
//   app.get("/articles", function(req, res) {
//     // TODO: Finish the route so it grabs all of the articles
//     db.Article.find({})
//       .then(function(dbArticle) {
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurs, send the error back to the client
//         res.json(err);
//       });
//   });
  
//   // Route for grabbing a specific Article by id, populate it with it's note
//   app.get("/articles/:id", function(req, res) {
//     // TODO
  
//     db.Article.findOne({_id: req.params.id})
//     .populate("note")
//     .then(function(dbArticle){
//       res.json(dbArticle)
      
//     })
  
//     .catch(function(err) {
//       // If an error occurs, send the error back to the client
//       res.json(err);
//     });
//     // ====
//     // Finish the route so it finds one article using the req.params.id,
//     // and run the populate method with "note",
//     // then responds with the article with the note included
//   });
  
//   // Route for saving/updating an Article's associated Note
//   app.post("/articles/:id", function(req, res) {
//     // TODO
  
//     db.Note.create(req.body)
//       .then(function(dbNote){
  
  
//       return db.Article.findOneAndUpdate({_id: req.params.id }, 
//          { notes: dbNote._id } , 
//         { new: true });
//       })
  
//       .then(function(dbArticle) {
//         // If the User was updated successfully, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurs, send it back to the client
//         res.json(err);
//       });
//     });

app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));

module.exports = app;