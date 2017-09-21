var express = require('express');
var router = express.Router();

router.get('/',ensureAuthenticated,function(req,res){

	res.render('index');
});
router.get('/index/loginTeacher',ensureAuthenticated,function(req,res){
	res.render('teacher');
});
router.get('/index/loginPT',ensureAuthenticated,function(req,res){
	res.render('production');
});
router.get('/index/loginOT',ensureAuthenticated,function(req,res){
	res.render('operation');
});/*
router.get('/operation',ensureAuthenticated,function(req,res){
	res.render('operation');
});*/

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/users/login');
	}
}

module.exports = router;