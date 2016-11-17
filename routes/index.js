var express = require('express');
var router = express.Router();
var api = require('../api/api.js');

//This will hold the login and sign up routes
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/register', api.signup);

module.exports = router;
