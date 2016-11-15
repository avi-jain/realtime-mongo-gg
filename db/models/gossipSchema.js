var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
	status: String,
	partner: {
		type: String,
		unique: false
	},
	location: String
},
{
  	capped: 10000
},
{
	collection : 'gossip' 
});

module.exports = mongoose.model("Gossip",userSchema);