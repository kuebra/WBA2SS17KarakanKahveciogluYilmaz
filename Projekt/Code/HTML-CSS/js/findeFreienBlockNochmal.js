//zum verbinden mit server
//Quelle: https://www.html5rocks.com/en/tutorials/cors/
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

function findeNochmal(){
	
	var dHost = 'http://localhost';
	var dPort = 8080;
	var dURL = dHost + ':' + dPort;
	var auswahl = document.getElementById("ZeitAuswahl");
	var x = auswahl.options[auswahl.selectedIndex].text;
	var getFreeBlock = dURL +'/findeTermin:'+ x;

	var xxhr = createCORSRequest('GET', getFreeBlock);

	xxhr.onload = function()
	{
		var data = xxhr.responseText;
		console.log(data);
		
		console.log(data);

		document.getElementById('Zeiger').innerHTML=data;
	}
	xxhr.send();
}