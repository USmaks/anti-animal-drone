// Server ///////////////////////////////////////

var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function () {
  console.log('Server started!');
});

/////////////////////////////////////// Server //

// Arduino //////////////////////////////////////

var five = require('johnny-five'),
    temporal = require('temporal'),
    board;

var board = new five.Board();

board.on('ready', function () {
  var num;
  this.pinMode(9, five.Pin.PWM);
  for(var i=0; i<255; i++){
    setTimeout(function () {
      num = i;
    }, 2000);
      this.analogWrite(9, i);
  }

});

// setTimeout(function () {
  //   // process
// }, 1000);
////////////////////////////////////// Arduino //
