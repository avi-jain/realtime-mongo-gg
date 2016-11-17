var express = require('express');
var router = express.Router();
var api = require('../api/api.js');

//This shall hold the user related functions
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/stalk', api.getAllUsers);
router.post('/location', api.changeLocation);
router.post('/partner', api.changePartner);
/*router.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});*/
module.exports = router;
