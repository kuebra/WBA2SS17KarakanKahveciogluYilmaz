var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var request =require('request');
var dateFormat = require('dateformat');

var dHost = 'http://localhost';
var dPort = 3000;
var dURL = dHost + ':' + dPort;


//um die url mit variablen zu verbinden
app.use(bodyParser.urlencoded({
	extended: true
}));

//um den request zu parsen
app.use(bodyParser.json());

//Aktiviere CORS um vom browser auf den Server zugreifen zu können
//Quelle: https://www.html5rocks.com/en/tutorials/cors/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//daten löschen 
app.delete('/loschen:id', function(req,res){
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var id = req.params.id.replace(':','');
	
	console.log(id);
	
	var options ={
		uri: dURL + '/loschen:' + id,
		method: 'DELETE'
	}
	
	request(options, function(err,response,body){
		res.status(response.statusCode).send(body);
	});
	
});


//die höchste ID in den Daten ermitteln
app.get('/highestID', function(req,res){
	
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	var url = dURL + '/Termine';
	
	request(url,function(err,response,body){
		var myJsonString = "{ \"Termine\":["+body+"]}";
		var toSearch = myJsonString.replace(/}/g,"},").replace(",]","]").slice(",",-1);
		
		toSearch = JSON.parse(toSearch);
		
		var maxID=toSearch.Termine[0];
		for (var i in toSearch.Termine)
			{
				var current = toSearch.Termine[i];
				if (maxID.ID<current.ID)
					{
						maxID=current;
					}
			}
		//console.log(maxID);
		res.status(response.statusCode).send(JSON.stringify(maxID));
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
		//um den Client zu den veranstalungen weiterzuleiten
		res.status(response.statusCode).redirect(req.headers.origin+'/html/veranstaltung.html');
	});
});

app.get('/', function(req, res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	
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
		var myJsonString = "{ \"Termine\":["+body+"]}";
		var toSend = myJsonString.replace(/}/g,"},").replace(",]","]").slice(",",-1);
		res.status(response.statusCode).send(toSend);
	});
	
});

//holen der gelöschten Termine
app.get('/geloschte', function(req,res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	var url = dURL + '/geloschte';
	
	request(url,function(err,response,body){
		var myJsonString = "{ \"GeloeschteTermine\":["+body+"]}";
		var toSend = myJsonString.replace(/}/g,"},").replace(",]","]").slice(",",-1);
		res.status(response.statusCode).send(toSend);
	});
	
});

//holen von terminen eines bestimmten faches
app.get('/termine:Fach', function(req,res){
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var clientFach = req.params.Fach.replace(':','');
	
	var options ={
		uri: dURL + '/termine:' + clientFach,
		method: 'GET'
	}
	
	request(options, function(err,response,body){
		var myJsonString = "{ \"Termine\":["+body+"]}";
		var toSend = myJsonString.replace(/}/g,"},").replace(",]","]").slice(",",-1);
		res.status(response.statusCode).send(toSend);
	});
});

//finde den nächsten freien Terminblock
app.get('/findeTermin:Min', function(req,res){
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	var min = parseInt(req.params.Min.replace(':',''));
	console.log("die minuten:"+min);
	var options ={
		uri: dURL + '/termine',
		method: 'GET'
	}
	request(options, function(err,response,body)
	{	

		//rückwandlung des Bodys vom dienstgebers zu einem JSON String
		var myJsonString = "{ \"Termine\":["+body+"]}";
		var toParse = myJsonString.replace(/}/g,"},").replace(",]","]").slice(",",-1);

		//Parsen zu js Objekt
		var alleTermine = JSON.parse(toParse);

		//Das Filtern der Benötigten Daten
		var dateEvents=[];
		for (var i in alleTermine.Termine)
		{
			var s = alleTermine.Termine[i];
			var date=
			{
				start:  new Date(s.Datum+"T"+s.StartZeit),
				end: new Date(s.Datum+"T"+s.EndZeit)
			}
			dateEvents.push(date);
		}

		//sotieren um die Suchergebnisse zu verbessern
		//Quelle: https://stackoverflow.com/a/1129270
		dateEvents = dateEvents.sort(function(a,b) {return (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0)} ); 
		
		//Berechnung der benötigten Zeit mithilfe von
		//Quelle: https://stackoverflow.com/a/38999603
		var requiredGap = min * 60 * 1000;
		var prev = dateEvents[0];
		var firstGap = null;

		//Die Suche nach dem Zeitblock
		for (var i = 0; i < dateEvents.length; i += 1)
		{
		  var current = dateEvents[i];
		  var diff = current.start - prev.end;

		  if (diff >= requiredGap && current.end.getUTCHours() < 20 && current.start.getUTCHours() > 9) 
		  {			  
			  
			firstGap = 
			{
			  start: prev.end,
			  end: current.start
			};
			break;
		  }
		   prev = current;
		}
		
		
		
		//wenn keine freien Blöcken gefunden wurden dann firstGap == null
		if (firstGap != null) 
		{
		  var x = dateFormat(firstGap.start, "UTC:dd.mm.yyyy' 'HH:MM");
		  var nachricht = "Nächster freie Termin um: "+x;
			console.log(nachricht);
		  res.status(200).send(nachricht);
		} 
		else 
		{
		  res.status(400).send("Leider keine freien Termine.")
		}

	});
	
});

//listener
app.listen(8080,function(){
	console.log('Listening on Port 8080');
});
