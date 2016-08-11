var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);
    
    //Check request method. Serve only GET
    if(req.method == 'GET') {
        
        //Construct the URL
        var fileUrl;
        
        //If URL = '/', return index.html from public folder
        if(req.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }
        
        //Create the file paht using the path module
        var filePath = path.resolve('./public' + fileUrl);
        
        //Check the file extension
        var fileExt = path.extname(filePath);
        
        //If extension is 'html' return file, else ignore request
        if(fileExt == '.html') {
            //Use file system module to check if file exists
            fs.exists(filePath, function(exists) {
                //Callback function's parameter will be set to true if file exists
                if(!exists) {
                    res.writeHead(404, {'Content-Type' : 'text/html'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }
                
                //If file exists, add 200 OK to header and pipe the contents of the file into the response body
                res.writeHead(200, {'Content-Type':'text/html'});
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.writeHead(404, {'Content-Type':'text/html'});
            res.end('<h1>Error 404: ' + fileUrl + ' is not a .html file</h1>');
        }
    } else {
        res.writeHead(405, {'Content-Type' : 'text/html'});
        res.end('<h1>Error 405: ' + req.method + ' not supported</h1>');
    }
});

server.listen(port, hostname, function() {
    console.log('Server running at http://' + hostname + ":" + port + '/');
});