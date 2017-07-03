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


app.delete('/loschen:id', function(req,res){
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var id = req.params.id.replace(':','');
	
	var options ={
		uri: dURL + '/loschen:' + id,
		method: 'DELETE'
	}
	
	request(options, function(err,response,body){
		res.send(body);
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
		res.send(body);
	});
		
	
});

app.get('/', function(req, res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var url = dURL + '/';
	
	request(url,function(err,response,body){
		res.send(body);
	});
	
});


app.get('/termine', function(req,res){
	
	console.log(req.path);
	var url = dURL + '/Termine';
	
	request(url,function(err,response,body){
		if (err) 
		{
			res.status(400).json("Fehler");
			throw err;
		}
		else
		{
			res.status(200).json(body);
		}
	});
	
});

//holen von terminen eines bestimmten faches
app.get('/termine:Fach', function(req,res){
	
	var clientFach = req.params.Fach;
	
	
	
	var options ={
		uri: dURL + '/termine:' + clientFach,
		method: 'GET',
		json: req.params.Fach
	}
	
	request(options, function(err,response,body){
		res.json(body);
	});
	
	/*request(url,function(err,response,body){
		if(err)
			{
				throw err;
				res.status(400).send("Fehler");
			}
		else
			{
				var jsonTermine = JSON.parse(body);
				jsonTermine.forEach(function(termine)
				{
					if (Object.keys(termine).length<1) return;
					console.log(termine.ID);
					res.write(termine.ID);
				})
				res.end();
			}
		
	})*/
});


//listener
app.listen(8080,function(){
	console.log('Listening on Port 8080');
});
