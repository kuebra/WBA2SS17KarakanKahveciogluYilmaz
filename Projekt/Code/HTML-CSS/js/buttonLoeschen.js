var dHost = 'http://localhost';
var dPort = 8080;
var dURL = dHost + ':' + dPort;

var loscheTermin = dURL +'/loschen:';

//zum verbinden mit server
//Quelle: https://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
	  
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function myfunction(btn)
{
	var r = confirm("Sind Sie sich sicher?");
	if (r == true)
		{
			var row = btn.parentNode.parentNode;
			var x = row.firstChild.innerHTML;
			loscheTermin+=x;
			console.log(loscheTermin);
			var xhr =createCORSRequest('DELETE',loscheTermin);
			xhr.onload=function()
			{
				var data = JSON.stringify(xhr.responseText);
				console.log(data);
			}
			xhr.send();
			location.reload(true);
		}
	else
		{
		}
}



//var xhr = createCORSRequest('DELETE',loscheTermin);