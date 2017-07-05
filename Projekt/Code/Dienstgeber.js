var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');

//um die url mit variablen zu verbinden
app.use(bodyParser.urlencoded({
	extended: true
}));

//um den request zu parsen
app.use(bodyParser.json());


//einfügen
app.post('/einfugen',function(req,res){
	
	console.log("/einfügen");
	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{
		
		var alleTermine = JSON.parse(data);
		
		alleTermine['Termine'].push(req.body);
		
		var z = JSON.stringify(alleTermine);
		
		
		fs.writeFile(__dirname+ "/Termine.json",z,function(err)
		{
                if(err) 
				{
					throw err;
					console.log("daten nicht eingefügt");
					res.status(400).send("Fehler ist aufgetreten!")
				}
        });
	})
	
	console.log("daten Eingefügt");
	res.status(200).send("ok");
});

//Start
app.get('/', function (req, res) {
	
	console.log(req.path);
	
	var x = "hauptseite";
	res.send(x);
	
});

//holen von terminen
app.get('/Termine', function(req,res){
	console.log(req.path);
	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{
		var alleTermine = JSON.parse(data);
		
		for (var i in alleTermine.Termine)
			{
				var x = alleTermine.Termine[i];
				if (x===null) continue;
				res.write(JSON.stringify(x));
			}
		res.status(200).end();
		
	})
});

app.get('/Termine:Fach',function(req,res){
	
	console.log(req.path);
	
	
	fs.readFile(__dirname + "/Termine.json","utf-8",function(err,data)
	{
		var alleTermine = JSON.parse(data);
		var clientFach = req.params.Fach;
		clientFach = clientFach.replace(':','');
		console.log(clientFach);
		
		for (var i in alleTermine.Termine)
			{
				var einTermin = alleTermine.Termine[i];
				
				//um eine abfrage zu einem schon gelöschten eintrag zu verhindern und dadurch einem crash vorzubeugen
				if (einTermin === null ) continue;
				if (einTermin.Fach === clientFach)
					{
						var y = JSON.stringify(einTermin);
						res.write(y);
					}
				
			}
		res.end();
		
	});
});

app.delete('/loschen:id', function(req,res){
	
	console.log(req.path);
	
	var myJsonString2;
	
	var x = fs.readFileSync(__dirname + "/Termine.json","utf-8");
	var alleTermine = JSON.parse(x);
	
	var id = req.params.id.replace(':','');
	var geloescht = false;	

	for (var i in alleTermine.Termine)
		{
			var einTermin = alleTermine.Termine[i];

			//um eine abfrage zu einem schon gelöschtem Eintrag zu verhindern und dadurch einem Crash vorzubeugen
			if (einTermin === null) continue;
			if (einTermin.ID===id)
				{
					if (fs.existsSync( __dirname+"/gelöschte_Termine.json"))
					{
						var y = fs.readFileSync(__dirname+"/gelöschte_Termine.json","utf-8");
						var alleGelöschtenTermine = JSON.parse(y);
						alleGelöschtenTermine['Gelöschte_Termine'].push(einTermin);
						
						myJsonString2 = JSON.stringify(alleGelöschtenTermine);
					}
					else
					{
						var str1 = "{ \"Gelöschte_Termine\":[";
						var str2 = "]}";
						var myJsonString = str1.concat(JSON.stringify(einTermin));
						myJsonString2 = myJsonString.concat(str2);	
					}

					fs.writeFile(__dirname+ "/gelöschte_Termine.json",myJsonString2,function(err){
								if(err) throw err;
					});

					delete alleTermine.Termine[i];
					geloescht = true;

				}
		}
		var StringJson= JSON.stringify(alleTermine);
		fs.writeFile(__dirname +"/Termine.json",StringJson,function(err)
		{
			if(err) throw err;
		});

		if (geloescht == false)
			{
				var nachricht = "die daten mit der ID: "+id+" wurden nicht gefunden."
				res.status(404).send(nachricht);
			}
		else
			{
				var nachricht = "die daten mit der ID: "+id+" wurde gelöscht.";
				res.status(200).send(nachricht)
			}
});

app.get('/geloschte', function(req,res){
	
	console.log(req.path);
	
	if(fs.existsSync(__dirname + "/gelöschte_Termine.json"))
		{
			fs.readFile(__dirname + "/gelöschte_Termine.json","utf-8", function(err,data)
			{		
				var alleTermine = JSON.parse(data);
				for (var i in alleTermine.Gelöschte_Termine)
				{
					var x = alleTermine.Gelöschte_Termine[i];
					res.write(JSON.stringify(x));
				}
				res.end();
			});
		}
	else
	{
		res.status(404).send("Die datei wurde nicht gefunden!");
	}
	
	
});

//listener
app.listen(3000,function(){
	console.log('Listening on Port 3000');
});