var express = require('express');
var app = express();

app.use(express.static(__dirname + 'public'));

app.get('/',function(req,res){
	res.send('hello world');
});

app.set('port',(process.env.port||3030));
app.listen(app.get('port'),function(){
	console.log('Server listening on port: '+app.get('port'));
})