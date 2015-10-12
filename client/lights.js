var map = require('./gridMapper.js');


function controlLights(grid, color){

  var pos;

  for(var i=0; i<grid.length;i++){
    pos.push(map.gridMapper(grid[i]));
  }

  setLights(pos, color);


}


function setLights(pos, color){
    for(var j=0; j<pos.length; j++){
      console.log(pos[j] + " " + color)
      //leds.setColor(pos[j], color)
    }
}


function setLight(pos, color){
 //console.log("in setLight");
 for(var j=0; j<pos.length; j++){
   var tempLed = pos[j];
   //console.log("Setting led " + pos + " to red");
   for(i = 0; i<numberLeds; i++){
     if(i == tempLed){
       leds.setColor(i, [255,0,0]);
     }else{
       // leds.setColor(i, [0,0,255]);
     }
    }
    leds.update();
  }
}


ColorEnum = {
  White : "[255,255,255]",
  Blue : "[0,0,255]",
  Green : "[0,255,0]",
  Red : "[255,0,0]",
  Black : "[0,0,0]"
}
