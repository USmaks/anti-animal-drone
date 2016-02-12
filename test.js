// Arduino //////////////////////////////////////

var five = require('johnny-five'),
    temporal = require('temporal'),
    board;

var board = new five.Board();
var A0 = 0;

board.on('ready', function () {
  this.pinMode(0, five.Pin.ANALOG);
  this.analogRead(0, function (voltage) {
    A0 = voltage;
  });

  setInterval(function () {
    console.log(A0);
  }, 1000);
  
});

////////////////////////////////////// Arduino //
