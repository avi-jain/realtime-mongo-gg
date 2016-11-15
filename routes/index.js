var express = require('express');
var router = express.Router();


//This will hold the login and sign up routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
  res.render('', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
