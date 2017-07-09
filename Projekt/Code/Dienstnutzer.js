var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var request =require('request');

var dHost = 'http://localhost';
var dPort = 3000;
var dURL = dHost + ':' + dPort;


//um die url mit variablen zu verbinden
app.use(bodyParser.urlencoded({
	extended: true
}));

//um den request zu parsen
app.use(bodyParser.json());

//daten löschen 
app.delete('/loschen:id', function(req,res){
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var id = req.params.id.replace(':','');
	
	var options ={
		uri: dURL + '/loschen:' + id,
		method: 'DELETE'
	}
	
	request(options, function(err,response,body){
		res.status(response.statusCode).send(body);
	});
	
});

//Einfügen von terminen
app.post('/einfugen', function(req,res){
	//log
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	console.log(req.body);
	
	
	var options = {
		uri: dURL + '/einfugen',
		method: 'POST',
		json: req.body
	}
	
	console.log(options.uri);
	request(options, function(err,response,body){
		res.status(response.statusCode).send(body);
	});
});

app.get('/', function(req, res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	console.
	
	var url = dURL + '/';
	
	request(url,function(err,response,body){
		res.status(response.statusCode).send(body);
	});
	
});

//Holen Aller Termine
app.get('/termine', function(req,res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	var url = dURL + '/Termine';
	
	request(url,function(err,response,body){
		res.status(response.statusCode).send(body);
	});
	
});

//holen von terminen eines bestimmten faches
app.get('/termine:Fach', function(req,res){
	
	var clientFach = req.params.Fach.replace(':','');
	
	var options ={
		uri: dURL + '/termine:' + clientFach,
		method: 'GET'
	}
	
	request(options, function(err,response,body){
		res.status(response.statusCode).send(body);
	});
});

//finde termine für ein bestimmtes Fach
app.get('/findefuer:Fach', function(req,res){
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var options = {
		uri: dURL+'/Termine';
		
	}
	
	require
	
});

//listener
app.listen(8080,function(){
	console.log('Listening on Port 8080');
});
