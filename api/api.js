var User = require('../db/models/userSchema');
var Gossip = require('../db/models/gossipSchema');

exports.signup = function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
            res.render("oops",{msg:"Please enter valid input values"});
        }
        else if (user) {
            res.render("oops",{msg:"User exists."});
        } 
        else {
            newUser = new User({email:req.body.email,password:req.body.password,
                                username:req.body.username});
            newUser.save(function (err, user, numberAffected) {
                if (err) {
                  console.log(err);
                  res.render("oops",{msg:"User could not be created. Please try again"});
                }
                else if (numberAffected === 1) {
                    res.render("home",{user:user});
                } 
                else {
                  //Random Error occured
                  res.render("oops",{msg:"Error Occured"});
                }             
            });
        }
    });
}

exports.follow = function(req, res) {

        User.findByIdAndUpdate(req.user._id, { $push: { "following": { name: req.body.follow, field:req.body.field} } }, {new: true}, function(err, user) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({user});
          }
        });
}

exports.unfollow = function(req, res) {

        User.findByIdAndUpdate(req.user._id, { $pull: { "following": { name: req.body.unfollow, field: req.body.field} } }, {new: true}, function(err, user) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ user});
          }
        });
}


exports.changeLocation = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id,
        {
          location : req.body.location,
        },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating location");
            res.json("Error occured while updating location.");
          } else {
            notification = new Gossip({ type:"location",username:req.user.username,data:req.body.location}); 
            notification.save(function (err, notif) {
              if (err) {
                console.error(err);
                res.render("oops",{msg:""})
              }
              else{
                //res.io.emit('location', { username: req.user.username, location: req.body.location });
                res.json(notif);
              }
            });
          }
        }
      );
}

exports.changePartner = function(req, res) {

    User.findByIdAndUpdate(
        req.user._id,{partner:req.body.partner},
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating partner");
            res.json("Error occured while updating partner.");
          } else {
            var notification = new Gossip({ type:"partner",username:req.user.username,data:req.body.partner}); 
            notification.save(function (err) {
              if (err) {console.error(err);res.render("oops",{msg:""})}
              //No response
              else{
                //res.io.emit('partner', { username: req.body.username, status: req.body.partner });
                res.send("Updated");
              }
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
      /*User.findById(req.session.passport.user._id,function(err,following) {
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