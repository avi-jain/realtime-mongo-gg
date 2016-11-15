var express = require('express');
var router = express.Router();


//This shall hold the user related functions
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/status/',function(){

});

 

module.exports = router;
