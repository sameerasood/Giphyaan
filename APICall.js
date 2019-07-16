
var http = require('http');

// Giphy trending endpoint
var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/trending?api_key=AvWn97WFSR6l637f7hvvUQSe7ekOrXTj&limit=3e&rating=G',
    method: 'GET'
  };

let responseData = [];

  http.get(options, (resp) => {
    console.log('STATUS: ' + resp.statusCode);
    console.log('statusMessage: ' + resp.statusMessage);
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      responseData += chunk;
    });
  
    // The whole response has been received. Get the result.
    resp.on('end', () => {
        setData(responseData);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

function setData(responseData){

var object = JSON.parse(responseData);   

var arr = [ ];
for (let i=0; i<object.data.length; i++){
   arr.push(new GiphyDomain(object.data[i].url,object.data[i].title));
}
}

class GiphyDomain {
    constructor(url, title) {
   this.url = url; // class varaibles
   this.title = title; // class variables
}
}

