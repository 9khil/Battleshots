

var socket = io.connect('http://localhost:1235'); //Must be directed to client.js with appropriate port number
var board,
	boardContainer;
window.onload = function() {

	var idForm = document.getElementById("identificationForm");


	idForm.onsubmit=function(e){
		e.stopPropagation();
		e.preventDefault();

		var name = document.getElementById("identificationName").value;
		if(name.length > 1){
			socket.emit('playerName', { content: name });
			document.getElementById("playerName").innerHTML = "Hello, Admiral " + name;
		};

	}
};


/************
Board
*************/

$(document).ready(function(){
			var myDropPositioning = {"boat1": 'left top', 'boat2': 'left top', 'boat3': 'middle top', 'boat4': 'left-40 top'};
			var atDropPositioning = {"boat1": 'left top', 'boat2': 'left top', 'boat3': 'middle top', 'boat4': 'left top'};
			var myDropPositioningVertical = {"boat1": 'left top', 'boat2': 'center center', 'boat3': 'center center', 'boat4': 'center center'};
			var atDropPositioningVertical = {"boat1": 'left top', 'boat2': 'center center+21', 'boat3': 'center center', 'boat4': 'center center+21'};
			var dropPositionModifier = {"boat1": 0, "boat2": 0, "boat3": -1, "boat4": -1}; //when dropping boats, target is not always correct. These modifiers will fix that.
			
			$(".boat2, .boat3, .boat4").dblclick(function(){
				//rotate boat
				$(this).toggleClass("vertical");
				var height = $(this).height();
				var width = $(this).width();
				$(this).height(width);
				$(this).width(height);
				
			});

			$( ".boat" ).draggable({
				drag: function(event, ui){
						
				}
			});

			$( ".board div span" ).droppable({
		      	over: function(event, ui) {
		      		$(this).addClass("ui-state-highlight");
		      	},
			    out: function(event, ui) {
			    	$(this).removeClass("ui-state-highlight");
			        $("#draggable").draggable("option", "grid", false);
			    },
		      	drop: function( event, ui ) {
		      		if(typeof ui.draggable[0] !== "undefined"){
		      			
		      			if($(ui.draggable).hasClass("vertical")){
		      				ui.draggable.position({
						      		of: $(this),
			    	    			my: myDropPositioningVertical[ui.draggable[0].classList[1]],
			        				at: atDropPositioningVertical[ui.draggable[0].classList[1]]
		        			});

		      			}else{
		      				ui.draggable.position({
						      		of: $(this),
						      		my: myDropPositioning[ui.draggable[0].classList[1]],
			        				at: atDropPositioning[ui.draggable[0].classList[1]]
		        			});
		        		}
	        			

			     	}
		      		
		      		//fix. dont call imOnaBoat two times
		      		if(isValidPosition(event, ui)){
		      			log("Dropped " + event.toElement.id + " onto " + whereIsMyBoat(event, ui).position);	
		      		}
			      	else{
			      		resetBoat(ui);
			      	}
			      	
		      	}
		    });

		    function isValidPosition(event, ui){
		    	var targetPosition = event.target.classList[0]; //boat drop position
		    	var boatType = event.toElement.id;

		    	if($(ui.draggable).hasClass("vertical")){
		    		var actualPosition = targetPosition.substring(0,1);
		    		var letterMapper = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6,'G': 7, 'H': 8, 'I': 9 };
		    		if(actualPosition !== 'd' && actualPosition !== 'l'){ //d is for digit and l is letter
		    			//check if boat is too far up
		    			if(boatType === "boat4" && letterMapper[actualPosition] >= 2 && letterMapper[actualPosition] <= 8){
							return true;
						}
						else if(boatType === "boat3" && letterMapper[actualPosition] >= 2 && letterMapper[actualPosition] <= 9){
							return true;
						}
						else if(boatType === "boat2" && letterMapper[actualPosition] >= 1 && letterMapper[actualPosition] <= 9){
							return true;
						}
						else{
							return false;
						}
						
		    		}

		    	}else{
			    	var actualPosition = parseInt(targetPosition.substring(1)) + dropPositionModifier[event.toElement.id]; //actual drop position, fixed with the array dropPositionModifier
			    	if(actualPosition !== 0 && targetPosition !== 'digit'){
			    		
			    		//see if boat it too far right
			    		if((boatType === "boat4" && actualPosition+3<=10) || (boatType === "boat3" && actualPosition+2<=10) || (boatType === "boat2" && actualPosition+1<=10) || (boatType === "boat1") && actualPosition<=10){
			    				return true;
			    		}
			    		else{
			    			return false;
			    		}
			    	}	
			    	else{
			    		return false;
			    	}
		    	}

		    }

		    function whereIsMyBoat(event, ui){

		    	var position = "";
		    	var targetPosition = event.target.classList[0]; //boat drop position

		    	if(event.toElement.id === "boat1"){
		    		position = targetPosition;
				}
		    	if(event.toElement.id === "boat2"){ 	//target + one to the right
			    	position = targetPosition + " " + targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))+1);
		    	}
		    	else if(event.toElement.id === "boat3"){	//target + one to the left and one to the right
		    		position = targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))-1) + " " + targetPosition +  " " + targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))+1);
		    	}
		    	else if(event.toElement.id === "boat4"){	//target + one to the left and two to the right
		    		position = targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))-1) + " " + targetPosition +  " " + targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))+1) + " " + targetPosition.substring(0,1) + (parseInt(targetPosition.substring(1))+2);
		    	}

		    	return {"boat": event.target.classList[0], "position": position};
		    	
		    }

		    function log(message){
		    	$("#console").prepend(message + "\n");
		    }

		    function resetBoat(ui){
		    	$(ui.draggable[0]).css("top", "0px");
		      	$(ui.draggable[0]).css("left", "0px");
		    }
			
		});

/**************
Response from RPi
***************/
socket.on('board', function (data) {
	console.log(data);
	if(data === "init"){
		//initBoard();
	}
});



/*******
helpers
******/
function parseSquareNumber(square){
	
	return square.substring(7,9);
}
