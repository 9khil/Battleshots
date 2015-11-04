function nameKeyup(event, element){

  if(event.keyCode == 13){

    if(element.value.length > 0){
      sendMessageToServer({messageType: "name", messageContent: element.value});
      setState("showBoard");
      setName(element.value);
    }else
      element.placeholder = "Enter name..!";
  }
}


function setState(state){
  switch (state) {
    case "showBoard":
      $("#stepOne").fadeOut('slow', function(){
          $("#stepTwo").fadeIn();
      });
      break;
    default:

  }
}

function setName(name){
  var el = document.getElementById("name");
  el.innerHTML = name;
}


function dropBoat(ev){
  ev.preventDefault();
  console.log(ev.srcElement);
  var boat = JSON.parse(ev.dataTransfer.getData('text/plain'));
  boat.startCoords = ev.srcElement.className;
    sendMessageToServer({messageType: "boatDropped", messageContent: boat});
  console.log('data', boat);
  ev.srcElement.style.backgroundColor = "red";
}

function allowDrop(ev){
  ev.preventDefault();
}

function startDrag(event) {
  event.dataTransfer.setData('text/plain', JSON.stringify(event.srcElement.dataset));
     console.log(event);
}