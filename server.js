/**
 * Created by Codenvoi
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4200;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function (socket) {
    socket.on('send-nickname', function(nickname) {
        socket.nickname = nickname;
        console.log('a user connected',socket.nickname);
        socket.broadcast.emit('new user',socket.nickname);
    });



    //disconnect whenever refresh
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    //logging msgs event
    socket.on('chat message', function(msg){
        console.log('message of: ' + socket.nickname + msg);

        //In order to send an event to everyone
        io.emit('chat message', msg);
    });
});



http.listen(port, function(){
    console.log('listening on *:' + port);
});