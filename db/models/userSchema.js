var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
	email: {
		type     : String,
		unique   : true,
		lowercase: true,
		required : true
	},
	username: {
		type    : String,
		required: true,
		unique  : true
	},
	password: {
		type    :String,
		required:true
	},
	location:{
		type:String
	},
	partner:{
		type:String
	},
	//Tells what the user in interested in tracking from our DB
	//We can use references here too. 
	// [{ type: ObjectId, ref: 'User' }]
	following :[new Schema({
        username: String,
        field: String
    }, { _id: false })],
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("User",userSchema);