var exports = module.exports = {};

exports.gridMapper = function(input){  
  var ledNumber = 0;
  
  var _abc = input.substring(0,1);
  var _123 = parseInt(input.substring(1,2));
  _123 = _123-1;

  switch(_abc){
    case "A":
      ledNumber = 0 + _123;
      break;
    case "B":
      ledNumber = 10 + (10 - _123);
      break;
    case "C":
      ledNumber = 20 + _123;
      break;
    case "D":
      ledNumber = 30 + (10 - _123);
      break;
    case "E":
      ledNumber = 40 + _123;
      break;
    case "F":
      ledNumber = 50 + (10 - _123);
      break;
    case "G":
      ledNumber = 60 + _123;
      break;
    case "H":
      ledNumber = 70 + (10 - _123);
      break;
    case "I":
      ledNumber = 80 + _123;
      break;
    case "J":
      ledNumber = 90 + (10 - _123);
      break;
    default:
      ledNumber = 0;
      break;
  }
  return ledNumber;
  //console.log(ledNumber)
}
