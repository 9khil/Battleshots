/*
  ENUMS
*/
BOATS = {"Submarine" : 1, "Destroyer" : 2, "Cruiser" : 3, "Battleship" : 4, "Aircraft carrier":	5};
FLEET = {"Submarines": 2,  "Destroyers" : 2, "Cruisers" : 2, "Battleships" : 1, "Aircraft carriers":	1};
GRIDSTATES = {"Empty": 0, "Water": 1, "Boat" : 2, "Fire/Hit" : 3, "Miss" : 4};
LETTERS = {"A": 1, "B": 2, "C" : 3, "D" : 4, "E" : 5, "F": 6, "G": 7, "H" : 8, "I" : 9, "J" : 10};
GAMESTATES = {"WaitingForPlayer1": 0, "WaitingForPlayer2": 1, "WaitingForBothPlayers" : 2};

/*
OBJECTS RELATION

game
  has players
    has unplaced boats
    has board
      has grid
        has cells/status?
      has placed boats
*/

function Game (){
  this.player1;
  this.player2;

  this.gameState;
  this.actionLog = [];

  this.registerNewPlayer = function (id, name) {
    if(typeOf player1 == "undefined") {
      this.player1 = new Player(id, name);
    }
    else {
      this.player2 = new Player(id, name);
    }
  };

  this.getPlayer = function (playerId) {
    if(typeOf this.player1 != "undefined" && this.player1.id == playerId) {
      return this.player1;
    }
    else if(typeOf this.player2 != "undefined" && this.player2.id == playerId) {
      return this.player2;
    }
  };

  this.getOpponent = function (playerId) {
    if(typeOf this.player1 != "undefined" && this.player1.id == playerId) {
      return this.player2;
    }
    else if(typeOf this.player2 != "undefined" && this.player2.id == playerId) {
      return this.player1;
    }
  };

  this.shotAtOpponent = function (playerId, coords) {

  };

  this.tryPlaceBoat = function (playerId, cords, boat) {

  };

}

function Player (id, name)
{
  this.id = id;
  this.name = name;
  this.board = new Board();
  this.boats = [];

  this.init = function () {
    for(boat in BOATS) {
      if (arrayHasOwnIndex(BOATS, boat)) {
        //todo init player available boats
      }
    }
  }

  this.fireAt = function (coords) {

  };

  this.init();
}

function Board ()
{
  this.grid = [];
  this.boats = [];

  this.init = function () {
    for(var letter = 1; i <= 10; i++) {
      this.grid[letter] = [];
      for(var num = 1; j <= 10; j++) {
        this.grid[letter][num] = GRIDSTATES.Empty;
      }
    }
  };

  this.playerView = function () {

  };

  this.enemyView = function () {

  };

  this.tryPlaceBoat = function (boat) {

  };

  this.hasBoat = function (coords) {

  };

  this.markGrid = function (coords, state) {

  };

  this.init();
}

function Boat (startCoords, orientation, length)
{
  this.startCoords = startCoords;
  this.orientation = orientation;
  this.length = length;

  this.collidesWith = function (boat) {

  };
}
