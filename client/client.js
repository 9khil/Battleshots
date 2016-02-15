
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

//noe annet nikhil tester. koble til gameEngine-server
var ioc = require( 'socket.io-client' );
var client = ioc.connect( "http://localhost:" + 3000 );


client.on('connection', function(socket){
  socket.on('grid', function(data){
    var parsedData = JSON.parse(data);

    console.log("Got a new grid!! PÅ RIKTIG STED OGSÅ!!!");

  //  controlLights(data);

  });

});
client.once( "connect", function () {
    console.log( 'Client: Connected to port ' + 3000 );
    client.emit( "data", "Hello World", function ( message ) {
        console.log( 'Echo received: ', message );

    } );

} );
