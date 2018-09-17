
/**
 * Module dependencies.
 */
var express = require('express');
const config = require('./public/config');
var http = require('http');
var path = require('path');
// var mongoose = require('mongoose');
var cool = require('cool-ascii-faces');

// the ExpressJS App
var app = express();

// testing import of modules 
var msg = require('./models/Message.js');
console.log(msg);

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.

  // server port number
  app.set('port', process.env.PORT || 5000);

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  //app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  // app.use(express.favicon());
  // app.use(express.bodyParser());
  // app.use(express.methodOverride());

  // pass a secret to cookieParser() for signed cookies
  // app.use(express.cookieParser('SECRET_COOKIE_HASH_HERE'));
  // app.use(express.cookieSession()); // add req.session cookie support
  
  // // make sesssion information available to all templates
  // app.use(function(req, res, next){
  //   res.locals.sessionUserName = req.session.userName;
  //   res.locals.sessionUserColor = req.session.userColor;
  //   next();
  // });

  // app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database - skipping until week 5
  // app.db = mongoose.connect(process.env.MONGOLAB_URI);
  // console.log("connected to database");


// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

app.get('/cool', function(request, response) {
  response.send(cool());
});

var documents = require('./routes/documents');  

// ROUTES

var routes = require('./routes/index.js');

app.get('/', routes.index);
app.get('/freedomsung', routes.freedomsung);

app.get('/theme', routes.theme);

app.post('/pass_fail', routes.pass_fail);
app.get('/fail', routes.fail);

app.get('/freedom', routes.freedom);

app.get('/test', routes.test);

app.get('/media', routes.media);

app.use('/documents', documents);

var elastic = require('./models/elasticsearch');
elastic.indexExists().then(function (exists) {
  if (exists) {
    return elastic.deleteIndex();
  }
}).then(function () {
  return elastic.initIndex().then(elastic.initMapping).then(function () {
    var promises = [
      'Local Government Elections Workshop',
      'Orlando East March',
      'Protea South March',
      'Alex People\'s Inspection',
      'SCR March',
      'Vaal March',
      'Heroes Day',
      'Abahlali Solidarity March',
      'Nersa Hearings',
      'Dennis Brutus Memorial',
      'Visit to Itereleng',
      'Vaal March',
      'Sharpeville Memorial',
      'POWA Book Launch',
      'Vaal March to Arcelor Mittal',
      'Visit to CDP',
      'World Cup March',
      'Youth Day',
      'Jozi Regional Housing March',
      'Schubart Park Anti-Xenophobia Event',
      'Quagga Evictions',
      'Soweto March',
      'Silent March',
      'SCR Meeting',
      'SECC March'
    ].map(function (bookTitle, i) {
      return elastic.addDocument({
        title: bookTitle,
        content: i,
        metadata: {
          titleLength: bookTitle.length
        }
      });
    });
    return Promise.all(promises);
  });
});

// app.get('/mediaImagesThumb', routes.mediaImagesThumb);

// app.get('/mediaImagesFull', routes.mediaImagesFull);

// //new astronaut routes
// app.get('/create',routes.astroForm); //display form
// app.post('/create',routes.createAstro); //form POST submits here

// // display a single astronaut
// app.get('/astronauts/:astro_id', routes.detail);

// // edit astronaut
// app.get('/astronauts/:astro_id/edit', routes.editAstroForm); //GET display form
// app.post('/astronauts/:astro_id/edit', routes.updateAstro); //POST update database

// // delete astronaut
// app.get('/astronauts/:astro_id/delete', routes.deleteAstro);

// // add ship's log
// app.post('/astronauts/:astro_id/addshiplog', routes.postShipLog);

// // API JSON Data routes
// app.get('/data/astronauts',routes.data_all);
// app.get('/data/astronauts/:astro_id', routes.data_detail);

// // consume a remote API
// app.get('/remote_api_demo', routes.remote_api);

// app.post('/set_session', routes.set_session);

// create NodeJS HTTP server using 'app'

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
