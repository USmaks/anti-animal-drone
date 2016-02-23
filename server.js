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
});

//////////////////////////////////////////////////////////// Server //

// Arduino ///////////////////////////////////////////////////////////
/*
var five = require('johnny-five'), temporal = require('temporal'), board;

board = new five.Board();

board.on("ready", function(){
  console.log("CONNECTED -> Arduino");

  var pm13 = this.pinMode(13, five.Pin.OUTPUT);
  var ledtest = function(){	pm13.digitalWrite(13, 1); };
  var ledstop = function(){	pm13.digitalWrite(13, 0); };
  // var sRr =

  ledtest();
  setTimeout(() => { ledstop(); }, 2000);

});
*/

/////////////////////////////////////////////////////////// Arduino //

// Xbee //////////////////////////////////////////////////////////////

var SerialPort = require('serialport').SerialPort, xbee = require('xbee');

var serial_xbee = new SerialPort('COM5', {
	parser: xbee.packetParser()
});

serial_xbee.on('data', function(data){

  io.emit('data', {
    name: 'DataFrame',
    text: 'From Child Xbee',
    type: data.type,
    frame: data
  });

	// console.log('xbee data received: ' + data.type);
	// console.log(data.bytes[0] + ' ' + data.bytes[1] + ' ' + data.bytes[2] + ' ' + data.bytes[3]+ ' ' + data.bytes[4]+ ' ' + data.bytes[5]+ ' ' + data.bytes[6]+ ' ' + data.bytes[7]+ ' ' + data.bytes[8]+ ' ' + data.bytes[9]+ ' ' + data.bytes[10]+ ' ' + data.bytes[11]+ ' ' + data.bytes[12]+ ' ' + data.bytes[13]+ ' ' + data.bytes[14]+ ' ' + data.bytes[15]+ ' ' + data.bytes[16]+ ' ' + data.bytes[17]+ ' ' + data.bytes[18]+ ' ' + data.bytes[19]+ ' ' + data.bytes[20]+ ' ' + data.bytes[21]+ ' ' + data.bytes[22]);
});

var atc = new xbee.RemoteATCommand();
atc.setCommand('IS'); //IS
atc.destination64 = [0x00, 0x13, 0xa2, 0x00, 0x40, 0xbb, 0xb5, 0x2b]; // Child xbee address
atc.destination16 = [0xff, 0xfe];

// setTimeout(() => { serial_xbee.write( atc.getBytes() ); }, 5000);
//setInterval(function(){
//	serial_xbee.write( atc.getBytes() ); //
//}, 2000);

////////////////////////////////////////////////////////////// Xbee //

// Apps //////////////////////////////////////////////////////////////

var weather = require('./weather.js');
var location = require('./location.js');

// setup yargs to have a --location or -l arguments
var argv = require('yargs')
	.option('location', {
		alias: 'l',
		demend: false,
		desicribe: 'Location to fetch weather for',
		type: 'string'
	})
	.help('help')
	.argv;

	if(typeof argv.l === 'string' && argv.l.length > 0){
		//console.log('Location was provided');
		weather(argv.l).then(function (currentWeather){
			console.log('In ' + currentWeather.name + '.');
			console.log('Today\'s temp. is ' + currentWeather.main.temp + ' C,');
      console.log('         weather is ' + currentWeather.weather.main + ',');
			console.log('         humidity is ' + currentWeather.main.humidity + ' %,');
			console.log('         wind speed is ' + currentWeather.wind.speed + ' m/s,');
			console.log('         wind deg. is ' + currentWeather.wind.deg + ' degree.');
/*
      io.emit('currentWeather', {
        name: currentWeather.name,
        temp: currentWeather.main.temp,
        weater: currentWeather.weather.main,
        humidity: currentWeather.main.humidity,
        windspeed: currentWeather.wind.speed,
        winddeg: currentWeather.wind.deg,
        clouds: currentWeather.clouds.all
      });
*/
		}).catch(function (error){
			console.log(error);
		});
	}else{
		console.log('Location was not provided');
		location().then(function (loc) {
			return weather(loc.city);
		}).then(function (currentWeather){
			console.log(currentWeather);
		}).catch(function (error){
			console.log(error);
		});
	}

////////////////////////////////////////////////////////////// Apps //
