var socket = io();
// var dataFrame = getQueryVariable('dataFrame');

socket.on('connect', function () {
  console.log('Connected to socket.io server!');

// setInterval(function(){
  socket.on('currentWeather', function(currentWeather){
    var $weathers = jQuery('.weather');
    var $weather = jQuery('<li class="list-group-item"></li>');
    $weathers.append('<p><strong> In ' + currentWeather.name + ',</strong></p>');
    $weather.append('<p>Temp is ' + currentWeather.temp + '.</p>');
    $weather.append('<p>Current weather is ' + currentWeather.weather + '.</p>');
    $weathers.append($weather);
  });
// }, day);

  socket.on('data', function (data){
    var $dataName = jQuery('.dataName');
    $dataName.html('<p>Address: ' + data.frame.bytes[1].toString(16) + ' ' + data.frame.bytes[2].toString(16) + ' ' + data.frame.bytes[3].toString(16) + ' ' + data.frame.bytes[4].toString(16) + ' ' + data.frame.bytes[5].toString(16) + ' ' + data.frame.bytes[6].toString(16) + ' ' + data.frame.bytes[7].toString(16) + ' ' + data.frame.bytes[8].toString(16) + '.(' + data.type + ')</p>');

    var voltage0 = (Math.pow(16, 2)*data.frame.bytes[16]%10 + data.frame.bytes[17])*1200/1023;
    var voltage1 = (Math.pow(16, 2)*data.frame.bytes[18]%10 + data.frame.bytes[19])*1200/1023;
    var voltage2 = (Math.pow(16, 2)*data.frame.bytes[20]%10 + data.frame.bytes[21])*1200/1023;
    var voltage3 = (Math.pow(16, 2)*data.frame.bytes[22]%10 + data.frame.bytes[23])*1200/1023;

    // AD0 = data.frame.bytes[18] + [19]
    var $ad0 = jQuery('.AD0');
    $ad0.html('<p>AD0: ' + parseInt(voltage0) + 'mV</p>');

    // AD1 = data.frame.bytes[20] + [21]
    var $ad1 = jQuery('.AD1');
    $ad1.html('<p>AD1: ' + parseInt(voltage1) + 'mV</p>');

    // AD2 = data.frame.bytes[22] + [23]
    var $ad2 = jQuery('.AD2');
    $ad2.html('<p>AD2: ' + parseInt(voltage2) + 'mV</p>');

    // AD3 = data.frame.bytes[24] + [25]
    var $ad3 = jQuery('.AD3');
    $ad3.html('<p>AD3: ' + parseInt(voltage3) + 'mV</p>');

    // var $dataframes = jQuery('.dataFrames');
    // var i = 9;
    // var val = [];
    // $dataframes.append('<p></p>');
    // while(data.frame.bytes[i] !== undefined){
    //   val[i] = data.frame.bytes[i];
    //   $dataframes.append('(' + i + ')' + val[i].toString(16) + ' ');
    //   i++;
    // }

  });
});
