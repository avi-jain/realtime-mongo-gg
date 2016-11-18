var express = require('express');
var router = express.Router();
var api = require('../api/api.js');

//This shall hold the user related functions
router.get('/', api.getHome);
router.get('/home', api.getHome);
router.get('/stalk', api.getAllUsers);
router.post('/stalk/follow', api.follow);
router.post('/stalk/unfollow', api.unfollow);
router.post('/location', api.changeLocation);
router.post('/partner', api.changePartner);

module.exports = router;
