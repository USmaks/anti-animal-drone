// Server ///////////////////////////////////////

var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function () {
  console.log('Server started on ' + PORT + 'port!');
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
var five = require('johnny-five'),
    temporal = require('temporal'),
    board;

var five = require("johnny-five"),
  temporal = require("temporal"),
  board;

board = new five.Board();

board.on("ready", function(){
  console.log("CONNECTED");

//  this.pinMode(0, five.Pin.ANALOG);
//	var A0 = this.analogRead(9);
//	console.log(A0);

  var servoRotateR = new five.Servo(13);
  var servoRotateL = new five.Servo(12);
  var servoSlantR = new five.Servo(11);
  var servoSlantL = new five.Servo(10);

//  this.pinMode(1, five.Pin.ANALOG);
  temporal.queue([{
    // Initial servo motor state
    delay: 0,
    task: function(){
      servoRotateR.min();
      servoRotateL.min();
      servoSlantR.min();
      servoSlantL.min();
    }
  },{
    // Flying Start
    delay: 5000, // waiting time about 5 seconds
    task: function(){
      servoSlantR.center();
      servoSlantL.center();
    }
  },{
    delay: 10000, // 10 seconds
    task: function(){
      servo.stop();
    }
  },{
    // Keeping the altitude
    delay: 1000,
    task: function(){
      servoSlantR.min();
      servoSlantL.min();
    }
  },{
    // Moving start
    delay: 2000,
    task: function(){
      servo.to(0);
    }
  }]);
});
////////////////////////////////////// Arduino //
