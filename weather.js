var request = require('request');

module.exports = function(location){
	return new Promise(function (resolve, reject){

		var encodedLocation = encodeURIComponent(location);
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodedLocation + '&appid=44db6a862fba0b067b1930da0d769e98&units=metric';
		// move url into here
		encodeURIComponent(location);

		if(!location){
			return reject('No location provided');
		}

		// somesite.com/a%20test
		// a test

		request({
			url: url,
			json: true
		}, function (error, response, body){
			if(error){
				reject('Unable to fetch weather.');
			}else{
				//		callback(JSON.stringify(body, null, 4));
				// It's ~~~~ in Chofu!
				resolve(body);
				// resolve('It\'s ' + body.main.temp + ' in ' + body.name + '!\nWind speed is ' + body.wind.speed + 'm/s,\nits degrees is ' + body.wind.deg + '!\nJust let you know, Cloudiness is ' + body.clouds.all + '%!');
			}
		});
	});
}
