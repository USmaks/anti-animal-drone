var socket = io();

socket.on('connect', function () {
  console.log('Connected to socket.io server!');
  socket.emit('dataframe', {

  })
})
socket.on('A0', function (A0) {
  var $A0 = jQuery('.A0');
  $AO.html('<p>' + A0.name + ' ' + A0.data + '</p>');
});
