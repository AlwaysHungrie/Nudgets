var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var StudentSchema = mongoose.Schema({
	name:{
		type:String
	},
	age:{
		type:Number
	},
	address:{
		type: String
	},
	phone:{
		type:Number
	},
	division:{
		type:String
	},
	attendance:{
		type:Number
	}
});

var Student = module.exports = mongoose.model('Student',StudentSchema);

module.exports.createUser = function(newUser,callback){
	newUser.save(callback);
}
module.exports.getStudentbyBatch = function(batch,callback){
	var query = {batch};
	User.find(query,callback);

}