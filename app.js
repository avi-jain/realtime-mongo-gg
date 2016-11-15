var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost/test');

//Passport
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
const secret = 'gossipguy'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'opsgainbackend';
passport.use('user',new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._doc._id, function(err,user) {
        if (err) {
            return done(err, false);
        }
        if (a) {
            done(null,user);
        } else {
            done(null, false);
        }
    });
}));

var app = express();
app.use(passport.initialize());
const user_auth = passport.authenticate('user', { session: false});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.post('/auth',function(req,res){
    User.findOne({username: req.body.username,password:req.body.password}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (!user) {
            res.send({success:false,message:"Authentication failed. No user found"})
        } else {
            var token = jwt.sign(user,opts.secretOrKey,{
              expiresIn: 604800 //a week
            });
            res.json({success:true,token:token});
        }
    });
});

io.on('connection',function(socket){
    console.log('Connection successful!');
    // This event will be emitted when a user changes .
    socket.on('statuschange',function(data){
        socket.broadcast.emit('A user changed her status');
    });
    socket.on('locationchange',function(data){
        socket.broadcast.emit('A user changed his location');
    });
    socket.on('songchange',function(data){
        socket.broadcast.emit('A user changed his jam!');
    });
});

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


module.exports = app;
