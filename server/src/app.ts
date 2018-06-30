

import * as socketio from 'socket.io';
import * as express from 'express';
import * as https from 'https';
import * as http from 'http';
import {SocketManager} from "./socket.manager";
import {writeFile,readFileSync,existsSync} from "fs";
import * as path from 'path';
const app = express();

const options = {
    cert: readFileSync(path.join(__dirname,'../cert/server.crt')).toString(),
    key: readFileSync(path.join(__dirname,'../cert/server.key')).toString()
};

// https
//const server = https.createServer(options,app);
// http
const server = http.createServer(app);
const io = socketio(server);

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname+'/../public/index.html'));
});


const filePath = path.join(__dirname,'../','storeData.tmp');
let tmpStr = existsSync(filePath)?readFileSync(filePath).toString():'';
const socketManager = new SocketManager(io,tmpStr?JSON.parse(tmpStr):null);


function storeVotesInterval(){
    const obj = socketManager.voteManager.getStoreObject();
    const data = JSON.stringify(obj,null,2);
    if(data==tmpStr){
        // 数据一样就不保存了
        return;
    }
    tmpStr = data;
    writeFile(filePath,tmpStr,(err)=>{
        if(err){
            console.error('save store object failed',err);
        }else{
            console.log('save store object success');
        }
    });
}
const saveTime = 120000;//5*60*1000;
// 5分钟保存一次数据
setInterval(storeVotesInterval,saveTime);

server.listen(3004, function(){
    console.log('listening on *:3004');
});
