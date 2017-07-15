var dHost = 'http://localhost';
var dPort = 8080;
var dURL = dHost + ':' + dPort;

var getTermine = dURL +'/Termine';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', getTermine);
xhr.onload = function()
{
	var data = JSON.parse(xhr.responseText);

	console.log(data.Termine);
	
	for (var i in data.Termine)
	{	
		var x = data.Termine[i];
	
		var tabelle = document.getElementById('tabelle');

		var reihe = tabelle.insertRow(1);

		var zelle1 = reihe.insertCell(0);
		var zelle2 = reihe.insertCell(1);
		var zelle3 = reihe.insertCell(2);
		var zelle4 = reihe.insertCell(3);
		var zelle5 = reihe.insertCell(4);
		var zelle6 = reihe.insertCell(5);
		var zelle7 = reihe.insertCell(6);
		zelle1.innerHTML = x.ID;
		zelle2.innerHTML = x.Fach;
		zelle3.innerHTML = x.Person;
		zelle4.innerHTML = x.Raum;
		zelle5.innerHTML = x.Datum;
		zelle6.innerHTML = x.StartZeit;
		zelle7.innerHTML = x.EndZeit;
	}
	
  }  


xhr.send();