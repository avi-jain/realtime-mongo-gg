var express = require('express');
var router = express.Router();
//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//This will hold the login and sign up routes
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/signup', function(req, res, next) {
  res.render('', { title: 'Express' });
});
router.post('/login',passport.authenticate('local', { failureRedirect: '/login'}),
	function(req, res, next) {
		res.render('home', { title: 'Express' });
	});
router.get('/logout', function(req, res, next) {
  res.render('logout');
});
module.exports = router;
