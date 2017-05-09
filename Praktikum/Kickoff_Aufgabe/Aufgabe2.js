var fs = require('fs');
var chalk = require('chalk');

fs.readFile(__dirname + "/staedte.json","utf-8",function(err, data){
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
            console.log(chalk.styles.blue.open+  "Name: " + obj[prop].name + chalk.styles.blue.close);
            console.log("Stadt: " + obj[prop].country);
            console.log(chalk.styles.yellow.open + "Einwohner: " + obj[prop].population + chalk.styles.yellow.close);
            console.log("-------------------------------");
    }
}
    
    
});