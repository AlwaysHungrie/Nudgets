var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValid = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//connecting to db
mongoose.connect('mongodb://dhairyaShah:gocashless@ds131384.mlab.com:31384/database-gods')
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

//Initalise the app
var app = express();

//init view engine(handlebars)
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs(/*{defaultLayout:'layout'}*/));
app.set('view engine','handlebars');

//bodyParse ???
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set the static folder
app.use(express.static(__dirname + '/public'));

//express session
app.use(session({
	secret: 'secret',
	saveUninitialized:true,
	resave: true
}));

//passport init(for authentication)
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValid({
	errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/',routes);
app.use('/users',users);

var port = process.env.PORT || 8000;
app.listen(port,function(){
	console.log('Server listening on port: '+port);
});
