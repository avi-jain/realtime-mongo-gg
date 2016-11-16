var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase:true,
		required:true
	},
	username: {
		type: String,
		unique: true
	},
	password: {
		type:String,
		required:true,
		unique:true
	},
	location:{
		type:String
	},
	partner:{
		type:String
	},
	//Tells what the user in interested in tracking from our DB
	//Again, we can use references here too. Would be easier in fact 
	// [{ type: ObjectId, ref: 'User' }]
	following :[{ name: String, field: String }],
	//Changes in the fields that are being tracked. User can remove too
	/*notifications:{
		type: Array
	},*/
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("User",userSchema);