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

//Einfügen von terminen
app.post('/einfugen', function(req,res){
	

	
	console.dir(req.body.form.name);
	
	res.send(req.body.form);
	
	
	
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
