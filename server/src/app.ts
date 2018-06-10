

import * as socketio from 'socket.io';
import * as path from 'path';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname+'/../public/index.html'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('haha','gggg');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
