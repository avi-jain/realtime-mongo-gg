var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// Better approach than directly from users collection because plus capped collections 
// can't perform complex operations , it throws a size not equal error
// hence simple insertion everytime
var gossipSchema = new Schema({
		// Specify type such as location
		type: String,
		// Name of the user / Username of user
		username: String,
		data: String
},
{
  	capped: 10000
},
{
	collection : 'gossips' 
});

module.exports = mongoose.model("Gossip",gossipSchema);