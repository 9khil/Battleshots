//var map = require('./gridMapper.js');
var leds = require('rpi-ws2801');

// disconnect on Ctrl-C (not necessary but we will play nice)
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  // clear LED stripe and close conection to SPI
  leds.clear();
  leds.disconnect();
  process.exit( )
});

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

function initLeds(){
  console.log("lights.js: Initializing leds!");
  leds.connect(100);

  grid = {};
  for (var i in LETTERS) {
    grid[LETTERS[i]] = {};
    for (var num = 1; num <= 10; num++) {
       grid[LETTERS[i]][num] = 1;
    }
  }
  controlLights(grid);
}

function controlLights(grid){

  for(var i=0; i<=99;i++){

    var coord = newGridMapper(i);

    setLight(i, colorFunction(grid[coord[0]][coord[1]]));

  }
  leds.update();


  //superstygg hack for å holde js i live. må fjernes!!
  setInterval(function(){}, 10000);
}

function setLight(pos, color){
  leds.setColor(pos, color);
}

/*
function controlLights(grid, color){
  //console.log("controlLights");
  var pos = new Array();
  pos = gridMapper(grid);
  setLights(gridMapper(grid), mapColor(color));
  return true;
}

function setLights(pos, color){
  //console.log("setLights");
    for(var j=0; j<pos.length; j++){
      console.log("Setting ledNr " + pos[j] + " to " + color)


      leds.setColor(pos[j], color);
    }
    leds.update();
}
*/

// function setLight(pos, color){
//  //console.log("in setLight");
//  for(var j=0; j<pos.length; j++){
//    var tempLed = pos[j];
//    //console.log("Setting led " + pos + " to red");
//    for(i = 0; i<numberLeds; i++){
//      if(i == tempLed){
//        leds.setColor(i, [255,0,0]);
//      }else{
//        // leds.setColor(i, [0,0,255]);
//      }
//     }
//     leds.update();
//   }
// }

function colorFunction(number){
  switch(number){
    case 0:
      return [0,0,0]; //black
    case 1:
      return [0,0,255]; //blue
    case 2:
      return [255,255,255]; //white
    case 3:
      return [255,0,0]; //red
    case 4:
      return [0,255,0]; //green
    }
}

var COLORENUM = {
  White : [255,255,255], //white
  Blue : [0,0,255], //blue
  Green : [0,255,0], //green
  Red : [255,0,0], //red
  Black : [0,0,0] //black
};

function mapColor(color){
  switch(color){
    case "White":
      return ColorEnum.White;
    case "Blue":
      return ColorEnum.Blue;
    case "Green":
      return ColorEnum.Green;
    case "Red":
      return ColorEnum.Red;
    case "Black":
      return ColorEnum.Black;
    default :
      return ColorEnum.Black;
  }
}

GRIDSTATES = {
    "Empty": 0, //black
    "Water": 1, //blue
    "Boat": 2, //white
    "Hit": 3, //red
    "Miss": 4 //green
};

function newGridMapper(ledNumber){

  if(ledNumber >= 0 && ledNumber <= 9){
    return ["A", ledNumber+1];
  }else if(ledNumber >= 10 && ledNumber <= 19){
    return ["B", 20-ledNumber];
  }else if(ledNumber >= 20 && ledNumber <= 29){
    return ["C", ledNumber-20+1];
  }else if(ledNumber >= 30 && ledNumber <= 39){
    return ["D", 40-ledNumber];
  }else if(ledNumber >= 40 && ledNumber <= 49){
    return ["E", ledNumber-40+1];
  }else if(ledNumber >= 50 && ledNumber <= 59){
    return ["F", 60-ledNumber];
  }else if(ledNumber >= 60 && ledNumber <= 69){
    return ["G", ledNumber-60+1];
  }else if(ledNumber >= 70 && ledNumber <= 79){
    return ["H", 80-ledNumber];
  }else if(ledNumber >= 80 && ledNumber <= 89){
    return ["I", ledNumber-80+1];
  }else if(ledNumber >= 90 && ledNumber <= 99){
    return ["J", 100-ledNumber];
  }

}


function gridMapper(inputArray){
  //console.log("gridMapper");
  var ledNumber = 0;
  var ledArray = [];

  for(var i=0; i<inputArray.length;i++){

    var input = inputArray[i];

    var letter = input.substring(0,1);
    var number = parseInt(input.substring(1));

    switch(letter){
      case "A":
        ledNumber = 0 + number-1;
        break;
      case "B":
        ledNumber = 10 + (10 - number);
        break;
      case "C":
        ledNumber = 20 + number-1;
        break;
      case "D":
        ledNumber = 30 + (10 - number);
        break;
      case "E":
        ledNumber = 40 + number-1;
        break;
      case "F":
        ledNumber = 50 + (10 - number);
        break;
      case "G":
        ledNumber = 60 + number-1;
        break;
      case "H":
        ledNumber = 70 + (10 - number);
        break;
      case "I":
        ledNumber = 80 + number-1;
        break;
      case "J":
        ledNumber = 90 + (10 - number);
        break;
      default:
        ledNumber = 0;
        break;
    }
  ledArray.push((ledNumber));
  }
  return ledArray;
  //console.log(ledNumber)
}
