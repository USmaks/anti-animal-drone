// Server ///////////////////////////////////////////////////////////

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

  socket.emit('dataframe', {
    name: 'data frame from xbee',
    text: 'Gotten data!',
    data: A0
  });
});

//////////////////////////////////////////////////////////// Server //

// Arduino ///////////////////////////////////////////////////////////

var five = require('johnny-five'), temporal = require('temporal'), board;

board = new five.Board();

board.on("ready", function(){
  console.log("CONNECTED");

  var pm13 = this.pinMode(13, five.Pin.OUTPUT);
  var ledtest = function(){	pm13.digitalWrite(13, 1); };
  var ledstop = function(){	pm13.digitalWrite(13, 0); };

  ledtest();
  setTimeout(() => { ledstop(); }, 2000);

});

/////////////////////////////////////////////////////////// Arduino //

// Xbee //////////////////////////////////////////////////////////////

var SerialPort = require('serialport').SerialPort, xbee = require('xbee');

var serial_xbee = new SerialPort('COM5', {
	parser: xbee.packetParser()
});

serial_xbee.on('data', function(data){
	console.log('xbee data received: ' + data.type);
//	var voltage = 1.2 * (ain3hi * 0x0100 + ain3lo) / 0x03ff;
//	var temperature = (voltage - 0.6) * 100;
	console.log(ain3hi + ' ' + data.bytes[1] + ' ' + ain3lo + ' ' + data.bytes[3]+ ' ' + data.bytes[4]+ ' ' + data.bytes[5]+ ' ' + data.bytes[6]+ ' ' + data.bytes[7]+ ' ' + data.bytes[8]+ ' ' + data.bytes[9]+ ' ' + data.bytes[10]+ ' ' + data.bytes[11]+ ' ' + data.bytes[12]+ ' ' + data.bytes[13]+ ' ' + data.bytes[14]+ ' ' + data.bytes[15]+ ' ' + data.bytes[16]+ ' ' + data.bytes[17]+ ' ' + data.bytes[18]+ ' ' + data.bytes[19]+ ' ' + data.bytes[20]+ ' ' + data.bytes[21]+ ' ' + data.bytes[22]);
});

var atc = new xbee.RemoteATCommand();
atc.setCommand('IS'); //IS
atc.destination64 = [0x00, 0x13, 0xa2, 0x00, 0x40, 0xbb, 0xb5, 0x2b]; // Child xbee address
atc.destination16 = [0xff, 0xfe];

setInterval(function(){
	serial_xbee.write( atc.getBytes() ); //
}, 2000);



////////////////////////////////////////////////////////////// Xbee //
