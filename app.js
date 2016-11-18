var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');
var mongo = require("mongodb");
var mongodbUri = "mongodb://127.0.0.1/test";

//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost/test');

const User = require('./db/models/userSchema.js');
const Gossip = require('./db/models/gossipSchema.js');
const auth = require('connect-ensure-login').ensureLoggedIn('/login');

//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require("socket.io")(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET,OPTIONS");
  next();
});

passport.use('user',new LocalStrategy(
  function(username, password, cb) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return (err); }
      if (!user) {
        console.log("Incorrect Username");
        return cb(null, false);
      }
      if (user.password != password) {
        console.log("Incorrect Password");
        return cb(null, false);
      }
      return cb(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'gossipguy', resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.io = io;
  next();
})
app.use('/', routes);
app.use('/users', auth, users);
app.post('/login',passport.authenticate('user'),function(req, res) {
    res.redirect('/users/home');
});
app.post('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/logout', auth, function(req, res) {
    req.logout();
    res.redirect('/');
});
  /*var cursor = Gossip.find().tailable(true, { awaitData: true,numberOfRetries: Number.MAX_VALUE }).cursor();

  cursor.on('data', function(doc) {
    console.log(doc);
  });*/
  /*cursor.on('data', function(data){
      console.log(data);
  }).on('error', function (error){
      console.log(error);
  }).on('close', function () {
      console.log('closed');
  });*/

// Mongo's tailable cursors can also be used for field level or nested level querying 
// by modifying the find operation. Here we simply check the type field of the gossips collection.
mongo.MongoClient.connect (mongodbUri, function (err, db) {
  io.sockets.on("connection", function (socket) {
  db.collection('gossips').find({},{tailable:true, awaitData:true, numberOfRetries:-1}) 
                      .each(function(err, doc){
      /*console.log(doc);*/
      if (doc) {
          socket.emit("all",doc);
        }
    });
  db.collection('gossips').find({type:"partner"},{tailable:true, awaitData:true, numberOfRetries:-1}) 
                      .each(function(err, doc){
      /*console.log(doc);*/
      if (doc) {
          socket.emit("partner",doc);
        }
    });
  db.collection('gossips').find({type:"location"},{tailable:true, awaitData:true, numberOfRetries:-1}) 
                      .each(function(err, doc){
      /*console.log(doc);*/
      if (doc) {
          socket.emit("location",doc);
        }
    });
  
  });
});

/*io.on('connection',function(socket){
    console.log('Connection successful!');
    // This event will be emitted when a user changes .
    socket.on('allchange',function(data){
        socket.volatile.emit('Status Changed');
    });
    socket.on('locationchange',function(data){
        socket.emit('Location Changed');
    });
    socket.on('partnerchange',function(data){
        socket.emit('Ahem');
    });
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//SERVER CONFIG


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
