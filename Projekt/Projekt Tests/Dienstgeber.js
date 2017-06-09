var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');

var neuTermin ={
	ID:"4",
	Name : "GDVK",
	Person : "Noss",
	Raum : "1682",
	Datum: "17.1.2017",
	StartZeit: "13:00",
	EndZeit: "14:00"	
};

//Start
app.get('/', function(req,res){
	console.log("hauptseite:");
	res.send("Hauptseite")
});


//Einfügen von terminen
app.put('/Einfugen', function(req,res){

	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
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
			console.log("Name "+ einTermin[prop2].Name);
			console.log("Person "+ einTermin[prop2].Person);
			console.log("Raum "+ einTermin[prop2].Raum);
			console.log("Startzeit "+ einTermin[prop2].StartZeit);
			console.log("Endzeit "+ einTermin[prop2].EndZeit);
            console.log("-------------------------------");
        }
		
		res.send(einTermin);
	}	
	})
});

app.delete('/loschen', function(req,res){
	fs.readFile(__dirname + "/Termine2.json","utf-8",function(err,data)
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
			if (!einTermin.hasOwnProperty(prop2))
			{
				continue;
			}
			else
				{
					if(einTermin[prop2].ID==="2")
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
						console.log("Name "+ einTermin[prop2].Name);
						console.log("Person "+ einTermin[prop2].Person);
						console.log("Raum "+ einTermin[prop2].Raum);
						console.log("Startzeit "+ einTermin[prop2].StartZeit);
						console.log("Endzeit "+ einTermin[prop2].EndZeit);
						console.log("-------------------------------");
				
					}
				}
			
        }
		
		res.send(einTermin);
	}	
	})
	

	
});

//listener
app.listen(3000,function(){
	console.log('Listening on Port 3000');
});

