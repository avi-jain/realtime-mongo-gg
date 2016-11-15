var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema({
	name: String,
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
	location:String,
	status:String,
	song: String,
	followers :{
		type : Array

	},
	following :{
		type : Array
		
	},
	notifications:{
		type: Array
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("User",userSchema);