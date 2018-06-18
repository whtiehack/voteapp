

import * as socketio from 'socket.io';
import * as path from 'path';
import * as express from 'express';
import * as nhttp from 'http';
import {SOCKET_MESSAGE} from 'sharecode/socketmessage';
import {SocketManager} from "./socket.manager";

const app = express();
const http = nhttp.createServer(app);
const io = socketio(http);

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname+'/../public/index.html'));
});

const socketManager = new SocketManager(io);



http.listen(3004, function(){
    console.log('listening on *:3004');
});
