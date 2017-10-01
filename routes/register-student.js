var express = require('express');
var router = express.Router();
var Student = require('../models/student');

router.post('/register',function(req,res){
		var name = req.body.name;
		var age  = req.body.age;
		var address  = req.body.address;
		var phone = req.body.phone;

		var newStudent = new Student({
			name: name,
			age : age,
			address:address,
			phone:phone
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.redirect('/index/loginTeacher');
});

module.exports = router;