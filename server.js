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


app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));

module.exports = app;