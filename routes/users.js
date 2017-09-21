var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('../models/users');



//login
router.get('/login',function(req,res){
	res.render('login');
});


passport.use('trainer',new LocalStrategy(
	function(username,password,done){
		User.getUserbyUsername(username,function(err,user){
			if(err)throw err;
			if(!user){
				return done(null, false, {message:'unknown user'});
			}
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err)throw err;
				if(isMatch && user.level=='trainer'){
					return done(null,user);
				}else{
					//console.log('pss mm');
					return done(null,false,{message: 'wrong password'});
				}
			});
		});
	})
);
passport.use('production',new LocalStrategy(
	function(username,password,done){
		User.getUserbyUsername(username,function(err,user){
			if(err)throw err;
			if(!user){
				return done(null, false, {message:'unknown user'});
			}
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err)throw err;
				if(isMatch && user.level=='production'){
					return done(null,user);
				}else{
					console.log(password + user.password);
					return done(null,false,{message: 'wrong password'});
				}
			});
		});
	})
);
passport.use('operation',new LocalStrategy(
	function(username,password,done){
		User.getUserbyUsername(username,function(err,user){
			if(err)throw err;
			if(!user){
				return done(null, false, {message:'unknown user'});
			}
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err)throw err;
				//if(!isMatch && user.level=='operation')console.log('wrong pws');
				if(isMatch && user.level=='operation'){
					console.log(user.level);
					return done(null,user);
				}else{
					console.log(user.level);
					//console.log(password + user.password);
					console.log('pss mm');
					return done(null,false,{message: 'wrong password'});
				}
			});
		});
	})
);
passport.serializeUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id, done) {
  User.getUserbyId(id, function(err, user) {
    done(err, user);
  });
});

router.post('/loginTeacher',
	passport.authenticate('trainer',{successRedirect:'/index/loginTeacher',failureRedirect:'/users/login',failureFlash:false}),
	function(req,res){
		
		res.redirect('/index/loginTeacher');
	});

router.post('/loginOT',
	passport.authenticate('operation',{successRedirect:'/index/operation',failureRedirect:'/users/login',failureFlash:false}),
	function(req,res){
		res.redirect('/index/operation');
	});
router.post('/loginPT',
	passport.authenticate('production',{successRedirect:'/index/production',failureRedirect:'/users/login',failureFlash:false}),
	function(req,res){
		res.redirect('/index/production');
	});

router.get('/logout',function(req,res){
	req.logout();
	req.redirect('/users/login');
});

module.exports = router;

