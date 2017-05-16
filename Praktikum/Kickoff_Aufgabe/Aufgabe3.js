var fs = require('fs');
var chalk = require('chalk');
var Staedte = [];

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
            var stadt = {"name":obj[prop].name, "country":obj[prop].country, "population":obj[prop].population };
            Staedte.push(stadt);

                  //die türme werden sortiert
            var sortiertestadt = Staedte.sort(function(a,b)
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
            
    //das erstellen und das konkettieren der zur schreibenden inhalte
    var str1 = "{ \"ciites\":";
    var str2 = "}";
    var myJsonString = str1.concat(JSON.stringify(sortiertestadt));
    var myJsonString2 = myJsonString.concat(str2);
            fs.writeFile(__dirname+ "/staedte_sortiert.json",myJsonString2,function(err){
                if(err) throw err;
            });

    fs.readFile(__dirname + "/staedte_sortiert.json","utf-8",function(err, data)
    {

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
            console.log(chalk.styles.red.open+  "Name: " + obj2[prop2].name + chalk.styles.red.close);
            console.log("Land: " + obj2[prop2].country);
            console.log(chalk.styles.cyan.open + "Einwohner: " + obj2[prop2].population + chalk.styles.cyan.close);
            console.log("-------------------------------");

        } 

    }    
    });

});