

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

function clickOnSquare(s){
	
}


function dragover(e){
	e.preventDefault();
	e.target.style.background = "green";
	
}

function dragleave(e){
	e.preventDefault();
	e.target.style.background = "lightblue";
}

function drop(e){
	e.preventDefault();

	var boat = e.dataTransfer.getData("elementId");


	if(boat === 'boat2'){
		e.target.appendChild(document.getElementById(boat));	


	}else{
		e.target.appendChild(document.getElementById(boat));	
	}
	
	
}

function dragstart(e){
	e.dataTransfer.setData("elementId", e.target.id);
}


/**************
Response from RPi
***************/
socket.on('board', function (data) {
	console.log(data);
	if(data === "init"){
		initBoard();
	}
});

function initBoard(){
	board = document.getElementById("board");
	boardContainer = document.getElementById("boardContainer");
	boardContainer.style.display = "block";

	for(var i = 0; i<100; i++){
		var x;
		if(i % 10 !== 0){
			x = document.createElement("span");
			x.id = "square_"+i;
			x.onclick = function(){
				clickOnSquare(this);
			};
			x.ondragover= function(){
				dragover(event);
			};
			x.ondragleave = function(){
				dragleave(event);
			};
			x.ondrop = function(){
				drop(event);
			};
			
			x.className = "square";
		}
		else{
			x = document.createElement("div");
			x.className ="spacer";
			board.appendChild(x);

			x = document.createElement("span");
			x.className ="digit";
			x.innerHTML = (i/10)+1;
			board.appendChild(x);

			x = document.createElement("span");
			x.id = "square_"+i;
			x.className = "square";
			x.onclick = function(){
				clickOnSquare(this);
			};
			x.ondragover= function(){
				dragover(event);
			};
			x.ondragleave = function(){
				dragleave(event);
			};
			x.ondrop = function(){
				drop(event);
			};
		}

		board.appendChild(x);
	}

}


/*******
helpers
******/
function parseSquareNumber(square){
	
	return square.substring(7,9);
}
