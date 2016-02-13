
// Open socket for incoming user connections (tablet, phones, computers etc)

var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var serverPort = 4000;
var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(serverPort);
