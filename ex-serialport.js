var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var sp = new SerialPort('COM5', {
	baudrate: 57600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
//	parser: serialport.parsers.readline("\n")
}, false);

sp.on('open', function (){
	console.log('open');
	sp.on('data', function (data){
		var buffer = new Buffer(data, 'utf8');
		try {
//			console.log('data received: ' + buffer);
			sys.puts('here: ' + data);
		} catch (e) {
			console.log('Error');
			return;
		}
	});
});

