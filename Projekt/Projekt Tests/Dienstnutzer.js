var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var request =require('request');

var dHost = 'http://localhost';
var dPort = 3000;
var dURL = dHost +':' + dPort;


//um die url mit variablen zu verbinden
//wird noch nicht benutzt
app.use(bodyParser.urlencoded({
	extended: true
}));

//um den request zu parsen
app.use(bodyParser.json());


//Einfügen von terminen
app.post('/einfugen', function(req,res){
	//log
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	console.dir(req.body);
	
	
	var options = {
		uri: dURL + '/einfugen',
		method: 'POST',
		json: req.body
	}
	request(options, function(err,response,body){
		res.json(body);
	});
		
	
});

app.get('/', function(req, res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var url = dURL + '/';
	
	request(url,function(err,response,body){
		res.status(200).send(body);
	});
	
});


app.get('/termine', function(req,res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	var url = dURL + '/Termine';
	
	request(url,function(err,response,body){
		if (err) 
		{
			throw err;
			res.status(400).send("Fehler");
		}
		else res.status(200).send(body);
	});
	
});

//listener
app.listen(8080,function(){
	console.log('Listening on Port 8080');
});
