var dHost = 'http://localhost';
var dPort = 8080;
var dURL = dHost + ':' + dPort;

var getHieghestID = dURL +'/highestID';

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


//der Versuch einem Input Element
var btn = document.getElementById("submitbtn");

btn.addEventListener('click', function(){
	var xhr = createCORSRequest('GET', getHieghestID);
	
	xhr.onload=function(){	
		var data = xhr.responseText;
		var x = parseInt(data)+1;
		console.log(x);
		document.getElementById('IDis').nodeValue = x;
	}
	xhr.send();
});