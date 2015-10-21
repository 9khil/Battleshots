var socket = io('http://localhost:3000');

  socket.on('connect', function(){
    console.log("Connected to server!");
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

  setInterval(function(){
      socket.emit("boatDropped", ["A", 5]);
  }, 5000);
}
