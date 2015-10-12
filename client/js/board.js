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
