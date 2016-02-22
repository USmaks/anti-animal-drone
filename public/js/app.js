var socket = io();
// var dataFrame = getQueryVariable('dataFrame');

socket.on('connect', function () {
  console.log('Connected to socket.io server!');

  socket.on('data', function (data){
    var $dataframes = jQuery('.dataFrames');
    $dataframes.append('<p><strong>' + data.name + ': ' + data.type + data.frame.bytes[0] + '</strong></p>');
  });

// setInterval(function(){
  socket.on('currentWeather', function(currentWeather){
    var $weather = jQuery('.weather');
    // var $weather = jQuery('<li class="list-group-item"></li>');
    // $weather.html('<p><strong> In ' + currentWeather.name + ',</strong></p>');
    // $weather.html('<p>Temp is ' + currentWeather.temp + '.</p>');
    $weather.append('<p>Current weather is ' + currentWeather.weather + '.</p>');
    // $weathers.append($weather);
  });
// }, day);
});
