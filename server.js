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

var five = require('johnny-five'), temporal = require('temporal'), board;

board = new five.Board();

board.on("ready", function(){
  console.log("CONNECTED -> Arduino");

  // var pm13 = this.pinMode(13, five.Pin.OUTPUT);
  // var ledtest = function(){	pm13.digitalWrite(13, 1); };
  // var ledstop = function(){	pm13.digitalWrite(13, 0); };

  // Servo Rotate right or left stick
  var sRr = new five.Servo(13);
  var sRl = new five.Servo(12);
  // Servo Tilt right or left stick
  var sTr = new five.Servo(11);
  var sTl = new five.Servo(10);

  // start
  setTimeout(() => { console.log('Count down start!'); }, 2000);
  setTimeout(() => { console.log('5'); }, 3000);
  setTimeout(() => { console.log('4'); }, 4000);
  setTimeout(() => { console.log('3'); }, 5000);
  setTimeout(() => { console.log('2'); }, 6000);
  setTimeout(() => { console.log('1'); }, 7000);

  setTimeout(() => { console.log('AAD System\nActivating...'); }, 8000);

  setTimeout(() => {

  }, 9000);
  // ledtest();
  // setTimeout(() => { ledstop(); }, 2000);

});


/////////////////////////////////////////////////////////// Arduino //

// Xbee //////////////////////////////////////////////////////////////

var SerialPort = require('serialport').SerialPort, xbee = require('xbee');

var serial_xbee = new SerialPort('COM5', {
	parser: xbee.packetParser()
});

serial_xbee.on('data', function(data){
// data { data.type, data.bytes }
  io.emit('data', {
    name: 'DataFrame',
    text: 'From Child Xbee',
    type: data.type,
    frame: data
  });

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
			console.log('現在の気温は ' + currentWeather.main.temp + ' ℃,');
      console.log('      天気は ' + currentWeather.weather.id + ',');
			console.log('      湿度は ' + currentWeather.main.humidity + ' %,');
			console.log('      風速は ' + currentWeather.wind.speed + ' m/s,');
			console.log('   風の方角は ' + currentWeather.wind.deg + ' degree.');

      io.emit('currentWeather', {
        name: currentWeather.name,
        temp: currentWeather.main.temp,
        weater: currentWeather.weather.main,
        humidity: currentWeather.main.humidity,
        windspeed: currentWeather.wind.speed,
        winddeg: currentWeather.wind.deg,
        clouds: currentWeather.clouds.all
      });

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
