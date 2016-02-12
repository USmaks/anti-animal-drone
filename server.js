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

io.on('connection', function (socket) {
  console.log('User connected via socket.io!');

  socket.emit('A0', {
    name: 'A0 pin',
    text: 'Gotten voltage',
    data: A0
  });
});
/////////////////////////////////////// Server //

// Arduino //////////////////////////////////////
var A0 = 0;
var five = require('johnny-five'),
    temporal = require('temporal'),
    board;

var board = new five.Board();

board.on('ready', function () {
  this.pinMode(0, five.Pin.ANALOG);
  A0 = this.analogRead(9);
});

////////////////////////////////////// Arduino //
