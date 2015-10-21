//var map = require('./gridMapper.js');
var leds = require('rpi-ws2801');


//test
controlLights(["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"], "White");
controlLights(["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"], "Blue");
controlLights(["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"], "Green");
controlLights(["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"], "Red");
controlLights(["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"], "Black");
controlLights(["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"], "White");
controlLights(["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"], "Blue");
controlLights(["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"], "Green");
controlLights(["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"], "Red");
controlLights(["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"], "Black");


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

var ColorEnum = {
  White : "[255,255,255]",
  Blue : "[0,0,255]",
  Green : "[0,255,0]",
  Red : "[255,0,0]",
  Black : "[0,0,0]"
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


function gridMapper(inputArray){
  //console.log("gridMapper");
  var ledNumber = 0;
  var ledArray = [];

  for(var i=0; i<inputArray.length;i++){
  var input = inputArray[i];
    var _abc = input.substring(0,1);
    var _123 = parseInt(input.substring(1));

    switch(_abc){
      case "A":
        ledNumber = 0 + _123-1;
        break;
      case "B":
        ledNumber = 10 + (10 - _123);
        break;
      case "C":
        ledNumber = 20 + _123-1;
        break;
      case "D":
        ledNumber = 30 + (10 - _123);
        break;
      case "E":
        ledNumber = 40 + _123-1;
        break;
      case "F":
        ledNumber = 50 + (10 - _123);
        break;
      case "G":
        ledNumber = 60 + _123-1;
        break;
      case "H":
        ledNumber = 70 + (10 - _123);
        break;
      case "I":
        ledNumber = 80 + _123-1;
        break;
      case "J":
        ledNumber = 90 + (10 - _123);
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
