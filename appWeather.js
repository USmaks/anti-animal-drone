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
		console.log('Location was provided');
//		weather(argv.l, function (currentWeather){
//			console.log(currentWeather);
//		});
		weather(argv.l).then(function (currentWeather){
			console.log(currentWeather);
		}).catch(function (error){
			console.log(error);
		});
	}else{
		console.log('Location was not provided');
//		location(function (location){
//			if(location){
//				weather(location.city, function (currentWeather){
//					console.log(currentWeather);
//				});
//			}else{
//				console.log('Unable to guess location');
//			}
//		});
		location().then(function (loc) {
			return weather(loc.city);
		}).then(function (currentWeather){
			console.log(currentWeather);
		}).catch(function (error){
			console.log(error);
		});
	}
	
