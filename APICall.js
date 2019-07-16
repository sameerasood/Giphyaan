
var http = require('http');

// Giphy trending endpoint
var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/trending?api_key=AvWn97WFSR6l637f7hvvUQSe7ekOrXTj&limit=3e&rating=G',
    method: 'GET'
};

// DTO (Data transfer object)
let responseDto = [];

// http call to giphy endpoint 
http.get(options, (resp) => {
    console.log('STATUS: ' + resp.statusCode);
    console.log('statusMessage: ' + resp.statusMessage);
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        responseDto += chunk;
    });

    // The whole response has been received. Get the result.
    resp.on('end', () => {
        setData(responseDto);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

function setData(responseDto) {
    // parse raw data into js object aka DTO object to Domain object
    var object = JSON.parse(responseData);
    var giphyDomainArr = [];

    for (let i = 0; i < object.data.length; i++) {
        giphyDomainArr.push(new GiphyDomain(object.data[i].url, object.data[i].title));
    }
}

/**
 * Domain Object Representation
 */
class GiphyDomain {
    constructor(url, title) { // class constructor with two params
        this.url = url; // class variables
        this.title = title; // class variables
    }
}

