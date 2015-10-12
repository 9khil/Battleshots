
var leds = require('rpi-ws2801');

// connecting to Raspberry Pi SPI
leds.connect(50); // assign number of WS2801 LEDs

// disconnect on Ctrl-C (not necessary but we will play nice)
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  // clear LED stripe and close conection to SPI
  leds.clear(); 
  leds.disconnect();
  process.exit( )
})

