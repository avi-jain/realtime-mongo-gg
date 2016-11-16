var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//  Could reference users collection but that'd be overkill, plus capped collection so 
// can't perform complex operations here, hence simple insertion everytime
var gossipSchema = new Schema({
	partner: {
		// Name of the user / Username of user
		username: String,
		data: String
	},
	location: {
		username: String,
		data: String
	}
},
{
  	capped: 10000
},
{
	collection : 'gossip' 
});

module.exports = mongoose.model("Gossip",gossipSchema);