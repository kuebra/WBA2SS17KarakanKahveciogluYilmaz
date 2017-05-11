
var fs = require('fs');

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
            console.log("Name: " + obj[prop].name);
            console.log("Land: " + obj[prop].country);
            console.log("Einwohner: " + obj[prop].population);
            console.log("-------------------------------")
        }
    }    
});