var socket = io.connect("http://localhost:3000");

var messenger = document.getElementById("messenger");
var message = document.getElementById("message");
var send = document.getElementById("send");
var output = document.getElementById("output");
var show = document.getElementById("show");
var listusers = document.getElementById("listusers");

send.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    messenger: messenger.value
  })
});

message.addEventListener('keydown', function(){
  socket.emit('typing', {
    messenger: messenger.value
  })
});

socket.on('chat', function(data, users){
    console.log(data.messenger);

    output.innerHTML += '<p><strong>' +data.messenger+ ': </strong>' +data.message+ '</p>';
    message.value="";
    messenger.setAttribute("disabled","true");
    listusers.innerHTML = users;
    show.setAttribute("style","display:none");
});

socket.on('typing', function(data){
  show.innerHTML = '<p style="font-style: italic">' +data.messenger+ ' is typing...</p>';
  show.setAttribute("style","display:block");

});
