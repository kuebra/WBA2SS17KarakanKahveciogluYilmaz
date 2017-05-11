var fs = require('fs');
var chalk = require('chalk');
var tuerme = [];

fs.readFile(__dirname + "/staedte.json","utf-8",function(err, data)
{
    var x = JSON.parse(data);

    //code aus dem internet
    for (var text in x) 
    {
        // skip loop if the property is from prototype
        if (!x.hasOwnProperty(text)) continue;

        var obj = x[text];

        for (var prop in obj) 
        {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;


            // mein code            
            var turm = {"name":obj[prop].name, "country":obj[prop].country, "population":obj[prop].population };
            tuerme.push(turm);

                  //die türme werden sortiert
            var sortierterturm = tuerme.sort(function(a,b)
                                        {  
                                    if (a.population > b.population) 
                                    {
                                        return -1;
                                    }
                                    if (a.population < b.population) 
                                    {
                                        return 1;
                                    }
           return 0;});
        }
    }
            

    console.log(sortierterturm);
    var myJsonString = JSON.stringify(sortierterturm);
            fs.writeFile(__dirname+ "/staedte_sortiert.json",myJsonString,function(err){
                if(err) throw err;
            });

    fs.readFile(__dirname + "/staedte_sortiert.json","utf-8",function(err, data){
    var y = JSON.parse(data);

    //code aus dem internet
    for (var text2 in y) 
    {
        // skip loop if the property is from prototype
        if (!y.hasOwnProperty(text2)) continue;

        var obj2 = y[text2];
        
        for (var prop2 in obj2)
        {
        // skip loop if the property is from prototype
        if (!obj2.hasOwnProperty(prop2)) continue;

          // mein code
            console.log(chalk.styles.blue.open+  "Name: " + obj2[prop2].name + chalk.styles.blue.close);
            console.log("Land: " + obj2[prop2].country);
            console.log(chalk.styles.yellow.open + "Einwohner: " + obj2[prop2].population + chalk.styles.yellow.close);
            console.log("-------------------------------");

        } 

    }    
    });

});