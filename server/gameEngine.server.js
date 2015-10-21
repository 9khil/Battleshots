/* Server */
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
//
// var serverPort = 3000;
//
// console.log("Listening on port: " + serverPort);
//
// io.on('connection', function(socket){
//
//   console.log('a user connected');
//
//   socket.on('name', function(data){
//     game.registerNewPlayer(socket.id, data);
//   });
//
// });
//
// http.listen(serverPort, function(){
//   console.log('listening on *:' + serverPort);
// });

/* Server end */

/*
ENUMS
*/
BOATS = {
    "Submarine": 1,
    "Destroyer": 2,
    "Cruiser": 3,
    "Battleship": 4,
    "AircraftCarrier": 5
};
FLEET = {
    1: 2,   //Submarines
    2: 2,   //Destroyers
    3: 1,   //Cruisers
    4: 1,   //Battleship
    5: 1    //Aircraft carriers
};
ORIENTATION = {
    "HORIZONTAL" : "horizontal",
    "VERTICAL": "vertical"
};
GRIDSTATES = {
    "Empty": 0,
    "Water": 1,
    "Boat": 2,
    "Hit": 3,
    "Miss": 4
};
// LETTERS = [
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J"
// ];
LETTERS = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J"
};
LETTERSTONUM = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6,
    "G": 7,
    "H": 8,
    "I": 9,
    "J": 10
};
RANKS = [
    "Seaman Recruit",
    "Seaman Apprentice",
    "Seaman",
    "Petty Officer",
    "Chief Petty Officer",
    "Ensign",
    "Junior Lieutenant",
    "Lieutenant",
    "Lieutenant Commander",
    "Commander",
    "Captain",
    "Rear Admiral",
    "Vice Admiral",
    "Admiral",
    "Fleet Admiral",
    "Scallywag",
    "Pirate",
    "Pirate Captain",
    "Fleet Mascot",
    "Captain's Parrot",
    "Captain's Harlot"
];
GAMESTATES = {
    "WaitingForPlayers": 0,
    "WaitingForPlayer1": 1,
    "WaitingForPlayer2": 2
};

/*
OBJECTS RELATION

game
has players
  has unplaced boats
  has board
    has grid
      has cells/status
    has placed boats
      has type, startCoords and orientation
*/

/*
TEST CODE
*/
var game = new Game();
// var jk = game.registerNewPlayer(1, "JK");
// var nikhil = game.registerNewPlayer(2, "9khil");
//var stian = game.registerNewPlayer(3, "Stian");


function Game() {
    this.player1;
    this.player2;

    this.gameState;
    this.actionLog = [];

    this.registerNewPlayer = function(id, name) {
        if (typeof this.player1 === 'undefined') {
            this.player1 = new Player(id, name);
        } else if (typeof this.player2 === 'undefined') {
            this.player2 = new Player(id, name);
        } else {
            return console.log("Game in progress.");
        }

        this.printPlayers();
    };

    this.printPlayers = function(){

      if (typeof this.player1 !== 'undefined') {
        console.log("Player 1: ");
        console.log(this.player1.name);
        console.log(this.player1.id);
      }else{
        console.log("No player 1");
      }

      if (typeof this.player2 !== 'undefined'){
        console.log("Player 2: ");
        console.log(this.player2.name);
        console.log(this.player2.id);
      }else{
        console.log("No player 2");
      }


    }

    this.getPlayer = function(playerId) {

        if (typeof this.player1 !== 'undefined' && this.player1.id == playerId) {
            return this.player1;
        } else if (typeof this.player2 !== 'undefined' && this.player2.id == playerId) {
            return this.player2;
        }
    };

    this.getOpponent = function(playerId) {
        if (typeof this.player1 !== 'undefined' && this.player1.id == playerId) {
            return this.player2;
        } else if (typeof this.player2 !== 'undefined' && this.player2.id == playerId) {
            return this.player1;
        }
    };

    this.shootAtOpponent = function(playerId, coords) {
        var player = this.getPlayer(playerId);
        if (typeof player !== 'undefined') {
            if (this.gameState !== GAMESTATES.WaitingForPlayer1) {
                var opponent = this.getOpponent(playerId);
                if (typeof opponent !== 'undefined') {
                    opponent.fireAt(coords);
                    // Send both players round outcome
                } else  {
                    console.log("Unable to shoot at opponent. Player has no opponent");
                }
            } else {
                console.log("Unable to shoot at opponent. It's not " + player.toString() + "'s turn!");
            }
        } else {
            console.log("Unable to shoot at opponent. Cannot find player with id: " + playerId);
        }
    };

    this.tryPlaceBoat = function(playerId, boat) {
        var player = this.getPlayer(playerId);
        if (typeof player !== 'undefined') {
            if (player.tryPlaceBoat(boat)) {
                // Send confirmation and updated board to player
                console.log("Boat placed, " + player.toString());
            } else {
                // Send cannot complete action message
                console.log("Boat could not be placed, " + player.toString());
            }
        } else {
            console.log("Unable to place boat. Cannot find player with id: " + playerId);
        }
    };
}

function Player(id, name) {
    this.id = id;
    this.name = name;
    this.rank = RANKS[Math.floor(Math.random() * RANKS.length)];
    this.board = new Board();
    this.availableBoats;

    this.init = function() {
        this.availableBoats = JSON.parse(JSON.stringify(FLEET));
    };

    this.fireAt = function(coords) {

    };

    this.tryPlaceBoat = function(boat) {
        if (this.availableBoats[boat.type] > 0) {
            if (this.board.tryPlaceBoat(boat)) {
                this.availableBoats[boat.type]--;
                return true;
            }
        } else {
            console.log(this.toString() + " does not have more boats of type: " + boat.type + ", to place.");
        }
        return false;
    };

    this.toString = function() {
        return this.rank + " " + this.name;
    };

    this.init();
}

function Board() {
    this.grid = {};
    this.boatsOnBoard = [];

    this.init = function() {
        for (var i in LETTERS) {
            this.grid[LETTERS[i]] = {};
            for (var num = 1; num <= 10; num++) {
                this.grid[LETTERS[i]][num] = GRIDSTATES.Empty;
            }
        }
    };

    this.playerView = function() {
        return this.grid;
    };

    this.enemyView = function() {
        var enemyView = {}
        for (var i in LETTERS) {
            enemyView[LETTERS[i]] = {};
            for (var num = 1; num <= 10; num++) {
                if (this.grid[LETTERS[i]][num] !== GRIDSTATES.Hit || this.grid[LETTERS[i]][num] !== GRIDSTATES.Miss) {
                    enemyView[LETTERS[i]][num] = GRIDSTATES.Water;
                } else {
                    enemyView[LETTERS[i]][num] = this.grid[LETTERS[i]][num];
                }
            }
        }
        return enemyView;
    };

    this.tryPlaceBoat = function(boatToPlace) {
        for (var i in this.boatsOnBoard) {
            var boatOnBoard = this.boatsOnBoard[i];
            if (boatOnBoard.collidesWith(boatToPlace)) {
                console.log("Boat cannot be placed. Collides with boat: " + boatOnBoard.coordinates().toString());
                return false;
            }
        }
        this.placeBoat(boatToPlace);
        return true;
    };

    this.placeBoat = function(boat) {
        var coords = boat.coordinates();
        for (var i = 0; i < coords.length; i++) {
            this.grid[coords[i][0]][coords[i][1]] = GRIDSTATES.Boat;
        }
        this.boatsOnBoard.push(boat);
    };

    this.removeBoat = function(boat) {
        var coords = boat.coordinates();
        for (var i = 0; i < coords.length; i++) {
            this.grid[coords[i][0]][coords[i][1]] = GRIDSTATES.Empty;
        }
        this.boatsOnBoard.pop(boat); // This can't possibly work?
    };

    this.tryMoveBoat = function(boat, newCoords) {

    };

    this.hasBoat = function(coords) {
        return this.grid[coords[0]][coords[1]] === GRIDSTATES.Boat;
    };

    this.markGrid = function(coords, state) {
        this.grid[coords[0]][coords[1]] = state;
    };

    this.init();
}

function Boat(type, startCoords, orientation) {
    this.type = type;
    this.length = type; // Should have it's own configurable array
    this.orientation = orientation;

    this.validateStartCoords = function(startCoords) {
        if (this.orientation === ORIENTATION.VERTICAL && LETTERSTONUM[startCoords[0]] + this.length > 10) {
            throw "Not a valid first coordinate: " + startCoords[0] + ", for a boat of length: " + this.length + ", and orientation: " + this.orientation + ". Boat would be out of bounds of the board.";
        }

        if (this.orientation === ORIENTATION.HORIZONTAL && startCoords[1] + this.length > 10) {
            throw "Not a valid second coordinate: " + startCoords[1] + ", for a boat of length: " + this.length + ", and orientation: " + this.orientation + ". Boat would be out of bounds of the board.";
        }

        return startCoords;
    };

    this.startCoords = this.validateStartCoords(startCoords);

    this.coordinates = function() {
        var coords = [];
        coords.push(this.startCoords);
        for (var i = 1; i < this.length; i++) {
            if (orientation === ORIENTATION.HORIZONTAL) {
                coords.push([this.startCoords[0], this.startCoords[1] + i]);
            } else if (orientation === ORIENTATION.VERTICAL) {
                coords.push([LETTERS[LETTERSTONUM[this.startCoords[0]] + i], this.startCoords[1]]);
            }
        }
        return coords;
	};

    this.collidesWith = function(otherBoat) {
        var thisBoatsCoords = this.coordinates();
        for (var coord in thisBoatsCoords) {
            var otherBoatCoords = otherBoat.coordinates();
            for (var otherCoord in otherBoatCoords) {
                if (thisBoatsCoords[coord].toString() === otherBoatCoords[otherCoord].toString()) {
                    return true;
                }
            }
        }
        return false;
    };
}
