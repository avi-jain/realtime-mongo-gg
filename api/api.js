var User = require('../db/models/userSchema');
var Gossip = require('../db/models/gossipSchema');

exports.signup = function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.render("oops",{msg:""});
        }
        if (user) {
            res.render("oops",{msg:""});
        } else {
            newUser = new User();
            newUser.save(function (err, user, numberAffected) {
                if (err) {

                }
                if (numberAffected === 1) {
                    
                } 
                else {
                  //Random Error occured
                }             
            });
        }
    });
}

/*exports.follow = function(req, res) {

    User.findByIdAndUpdate(req.body.followingId, { $addToSet: { "followers": { username: req.body.follower} } }, {new: true}, function(err, newFollowing) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        User.findByIdAndUpdate(req.body.followerId, { $addToSet: { "following": { username: req.body.following} } }, {new: true}, function(err, newFollower) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: { following: newFollowing, follower: newFollower } });
          }
        });
      }
    });
}

exports.unfollow = function(req, res) {

    User.findByIdAndUpdate(req., { $pull: { "followe": { username: req.body.follower} } }, {new: true}, function(err, newFollowing) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        User.findByIdAndUpdate(req.body.followerId, { $pull: { "following": { username: req.body.following} } }, {new: true}, function(err, newFollower) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: { following: newFollowing, follower: newFollower } });
          }
        });
      }
    });
  }
}*/


exports.changeLocation = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id,
        {$set : {
          location : req.body.location,
        }
      },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating location");
            res.json("Error occured while updating location.");
          } else {
            var notification = new Gossip({ location: {username:req.user.username,data:req.body.partner} }); 
            notification.save(function (err) {
              if (err) {console.error(err);res.render("oops",{msg:""})}
              //No response
              //res.json("updated location");
            });
          }
        }
      );
}

exports.changePartner = function(req, res) {

    User.findByIdAndUpdate(
        req.user._id,
        {$set : {
          partner : req.body.partner,
        }
      },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating partner");
            res.json("Error occured while updating partner.");
          } else {
            var notification = new Gossip({ partner: {username:req.user.username,data:req.body.partner} }); 
            notification.save(function (err) {
              if (err) {console.error(err);res.render("oops",{msg:""})}
              //No response
            });
          }
        }
      );
}

//For the stalk page. Gets all users and details of users/fields the logged in user follows
exports.getAllUsers = function(req, res) {
  User.find({},function(err,users) {
    if(err){
      console.log("Error");
      res.render("oops",{msg:""});
    }
    else{
      /*User.findById(req.user._id,function(err,following) {
        if(err){
          console.log("Error");
          res.render("oops",{msg:""})
        }
        else{
          res.render("users",{users:users,following:following});
        }
      });*/
      res.render("users",{users:users});
      //res.json(users);
    }
  });
}

/*exports.changePartners = function(req, res) {
	var options = {tailable: true, awaitdata: true, numberOfRetries: -1};

	var stream = Gossip.find(, options).stream();

	stream.on('data', function(doc){
	    console.log(doc);
	}).on('error', function (error){
	    console.log(error);
	}).on('close', function () {
	    console.log('closed');
	});

});*/