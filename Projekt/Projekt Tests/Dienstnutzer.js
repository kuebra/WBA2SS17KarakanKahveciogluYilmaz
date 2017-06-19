var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');

//Holen der daten 		
var neuertermin = function gibWerte()
	{
		var vonHtmlTermin ={
			
				//Funktioniert nicht weil Node.js keine html Befehle unterstützt
				//neue lösung wird gesucht
				ID: "4",
				Name : document.getElementById("Fach").nodeValue,
				Person : document.getElementById("Person").nodeValue,
				Raum : document.getElementById("Raum").nodeValue,
				Datum: document.getElementById("Datum").nodeValue,
				StartZeit: document.getElementById("StartZeit").nodeValue,
				EndZeit: document.getElementById("EndZeit").nodeValue
		}
		console.log(vonHtmlTermin);
		return vonHtmlTermin;
	};
	
//Einfügen von terminen
app.post('/Einfugen', function(req,res){
	
	console.log(neuerTermin);
	
	res.send(neuerTermin);
	
	
	
//wird benutzt wenn die Funktion richtig funktioniert
/*	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{

		var obj = JSON.parse(data);
		
		var NeueTermine = JSON.stringify(neuTermin);
		
		
		//Push Funktioniert nicht!!!!!!
		obj['Termine'].push(NeueTermine);
		
		var z = JSON.stringify(obj)
		
		
		fs.writeFile(__dirname+ "/Termine2.json",z,function(err)
		{
                if(err) throw err;
        });
	})
	
	console.log("Alles fertig");
	res.send("alles Fertig");
	*/
});


//listener
app.listen(3001,function(){
	console.log('Listening on Port 3001');
});
