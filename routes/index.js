var express = require('express');
var router = express.Router();
//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var api = require('../api/api.js');

//This will hold the login and sign up routes
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/register', api.signup);

router.get('/logout', function(req, res, next) {
  res.render('logout');
});
module.exports = router;
