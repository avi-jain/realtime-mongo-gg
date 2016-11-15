exports.signup = function(req, res) {

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
exports.follow = function(req, res) {

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

    User.findByIdAndUpdate(req.body.followingId, { $pull: { "followers": { username: req.body.follower} } }, {new: true}, function(err, newFollowing) {
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
}

exports.changeStatus = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id,
        {$set : {
          song : req.body.song,
        }
      },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating song");
            res.json({"Error occured while updating song."});
          } else {
           // console.log("updated song : " + song);
           res.json({});
          }
        }
      );
}

exports.changeLocation = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id,
        {$set : {
          song : req.body.song,
        }
      },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating song");
            res.json({"Error occured while updating song."});
          } else {
           // console.log("updated song : " + song);
           res.json({});
          }
        }
      );
}

exports.changeSong = function(req, res) {

    User.findByIdAndUpdate(
        req.user._id,
        {$set : {
          song : req.body.song,
        }
      },
        {new:true},
        function(err, user) {
          if (err) {
            console.log("Error while updating song");
            res.json({"Error occured while updating song."});
          } else {
           // console.log("updated song : " + song);
           res.json({});
          }
        }
      );
}