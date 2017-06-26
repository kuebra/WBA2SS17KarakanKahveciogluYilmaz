var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');

//um die url mit variablen zu verbinden
//wird noch nicht benutzt
app.use(bodyParser.urlencoded({
	extended: true
}));

//um den request zu parsen
app.use(bodyParser.json());

//einfügen
app.post('/einfugen',function(req,res){
	
	console.log("/einfügen");
	console.log(req.body);
	
	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{
		
		var obj = JSON.parse(data);
		
		obj['Termine'].push(req.body);
		
		var z = JSON.stringify(obj)
		
		
		fs.writeFile(__dirname+ "/Termine.json",z,function(err)
		{
                if(err) 
				{
					throw err;
					res.status(400).send("Fehler ist aufgetreten!")
				}
        });
	})
	
	console.log("daten Eingefügt");
	res.status(200).send("ok");
});

//Start
app.get('/', function (req, res) {
	
	console.log("Zeit: " + Date.now() +" Pfad: " + req.path);
	
	res.status(200).send("Hauptseite");
});

//holen von terminen
app.get('/Termine', function(req,res){
	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{
		var alleTermine = JSON.parse(data);
		
		for (var x in alleTermine) 
		{
        // skip loop if the property is from prototype
        if (!alleTermine.hasOwnProperty(x)) continue;

        var einTermin = alleTermine[x];
        
        for (var prop2 in einTermin)
        {
        // skip loop if the property is from prototype
        if (!einTermin.hasOwnProperty(prop2)) continue;
          // mein code
			console.log("Die Daten sind.")
			console.log("ID "+ einTermin[prop2].ID)
			console.log("Fach "+ einTermin[prop2].Fach);
			console.log("Person "+ einTermin[prop2].Person);
			console.log("Raum "+ einTermin[prop2].Raum);
			console.log("Startzeit "+ einTermin[prop2].StartZeit);
			console.log("Endzeit "+ einTermin[prop2].EndZeit);
            console.log("-------------------------------");
        }
		
		res.status(200).send(einTermin);
	}	
	})
});

app.delete('/loschen:id', function(req,res){
	//termine2 weil test datei
	fs.readFile(__dirname + "/Termine2.json","utf-8",function(err,data)
	{
		var alleTermine = JSON.parse(data);
		var notNAN = String(req.params.id);
	
		var id = parseInt(notNAN);
		console.log(typeof(id) + " " + id);
		
		for (var x in alleTermine) 
		{
			// skip loop if the property is from prototype
			if (!alleTermine.hasOwnProperty(x)) continue;

			var einTermin = alleTermine[x];


			for (var prop2 in einTermin)
			{
			// skip loop if the property is from prototype
			if (!einTermin.hasOwnProperty(prop2))
			{
				continue;
			}
			else
				{
					
					//-------------------------------------------
					var einTerminID = String(einTermin[prop2].ID);
					console.log("-----------------------"+einTerminID+typeof(einTerminID));
					//__________________________________if überprüfung funktiniert nicht
					if(einTerminID===id)
					{
						console.log("nummer 2 wurde entdeckt")
						var gelöscht = einTermin[prop2];
						
						var str1 = "{ \"Gelöschte_Termine\":";
						var str2 = "}";
						var myJsonString = str1.concat(JSON.stringify(einTermin[prop2]));
						var myJsonString2 = myJsonString.concat(str2);
						
						fs.writeFile(__dirname+ "/gelöschte_Termine.json",myJsonString2,function(err){
									if(err) throw err;
								});
						
						delete einTermin[prop2];
					}
					else
					{
						
						// mein code
						console.log("Die Daten sind.")
						console.log("ID "+ einTermin[prop2].ID)
						console.log("Fach "+ einTermin[prop2].Name);
						console.log("Person "+ einTermin[prop2].Person);
						console.log("Raum "+ einTermin[prop2].Raum);
						console.log("Startzeit "+ einTermin[prop2].StartZeit);
						console.log("Endzeit "+ einTermin[prop2].EndZeit);
						console.log("-------------------------------");
				
					}
				}
			
        }
		
		res.status(200).send(einTermin);
	}	
	})
	

	
});

//listener
app.listen(3000,function(){
	console.log('Listening on Port 3000');
});

