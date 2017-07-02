//DIESE DATEI IST EINE MÜLL DATEI: HEIR WIRD NUR CODE ABGELAGERT DIE NICHT MEHR GEBRAUCHT WIRD UND GEGEBENFALLS ZUM NACHGUCKEN AUFBWAHRT WIRD
//DIESE WURDEN DURCH BESSEREN CODE ERSTZT



//wurde in '/Termine' gebraucht beim dienstgeber
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
		
		
	}



//wurde bei '/löschen' beim Dienstgeber benutzt

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