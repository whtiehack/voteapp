"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketio = require("socket.io");
var path = require("path");
var express = require("express");
var nhttp = require("http");
var socket_manager_1 = require("./socket.manager");
var app = express();
var http = nhttp.createServer(app);
var io = socketio(http);
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});
var socketManager = new socket_manager_1.SocketManager(io);
http.listen(3004, function () {
    console.log('listening on *:3004');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG9DQUFzQztBQUN0QywyQkFBNkI7QUFDN0IsaUNBQW1DO0FBQ25DLDRCQUE4QjtBQUU5QixtREFBK0M7QUFFL0MsSUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDdEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztJQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQU0sYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUk1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyJ9