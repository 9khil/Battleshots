var socket = io('http://10.0.0.38:3000');

// connection to GameEngine
  socket.on('connect', function(){
    console.log("Client connected to server!");
  });
  socket.on('event', function(data){
    console.log("event: ");
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log("disconnect");
  });

  socket.on('grid', function(data){
    var parsedData = JSON.parse(data);

    console.log(parsedData);

  });







function sendMessageToServer(message){
  socket.emit(message.messageType, message.messageContent);
}
