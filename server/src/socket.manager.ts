import {Server,Socket} from "socket.io";
import {SOCKET_MESSAGE,SOCKET_ROOM_NAME,SOCKET_EVENT} from "sharecode/socketmessage";
import {VoteData,IVote} from 'sharecode/interface';
import {EnumVoteManageResultCode, VoteManager} from "./vote.manager";

export class SocketManager{
    voteManager:VoteManager;
    constructor(private readonly io:Server){
        this.bindEvent();
        this.voteManager = new VoteManager();
    }

    private bindEvent(){
        this.io.on('connection', this.connection.bind(this));
    }

    private connection(socket:Socket){
        console.log('a user connected',socket.id);
        socket.emit('haha','gggg');
        this.bindSocketEvent(socket);
    }

    private bindSocketEvent(socket:Socket){
        socket.on(SOCKET_MESSAGE.CREATE_VOTE,this.createVote.bind(this));
        socket.on(SOCKET_MESSAGE.VOTE,this.clientVote.bind(this));
        socket.on(SOCKET_MESSAGE.JOIN_ROOM,(room,param,fn)=>this.joinRoom(socket,room,param,fn));
    }


    private async createVote(msg:VoteData,fn){
        console.log('!! create vote',msg,typeof msg);
        if(!msg || !msg.title || !msg.time || !msg.endTime ||!msg.opinions){
            return fn('参数错误');
        }
        msg.votedNames = {};
        msg.votes = [];
        for(let i=0;i<msg.opinions.length;i++){
            msg.votes.push([]);
        }
        const voteid = await this.voteManager.createVote(msg);
        if(!msg.hide){
            const smallVote = this.voteManager.trans2SmallVote(msg);
            console.log('notify list',SOCKET_EVENT.VOTE_NOTIFY,smallVote);
            this.io.to(SOCKET_ROOM_NAME.LIST).emit(SOCKET_EVENT.VOTE_NOTIFY,smallVote);
        }
        fn(null,voteid);
    }

    private async clientVote(msg:IVote,fn){
        if(!msg || !msg.id ||!msg.name ){
            return fn('参数错误');
        }
        if(!msg.opinionIdx && msg.opinionIdx!=0){
            return fn('没有选择选项');
        }
        console.log('client vote',msg);
        const result = await this.voteManager.userVote(msg.id,msg.opinionIdx,msg.name,msg.remark);
        if(result != EnumVoteManageResultCode.SUCCESS){
            return fn(result);
        }
        // notify
        this.io.to(SOCKET_ROOM_NAME.VOTE_+msg.id).emit(SOCKET_EVENT.VOTE_ADD_NAME,msg);
        return fn(null,'success');
    }

    private async joinRoom(socket:Socket,roomName:string,param:any,fn){
        console.log('join room',roomName,param);
        if(roomName.indexOf(SOCKET_ROOM_NAME.VOTE_)>=0){
            const voteData = await this.voteManager.getVoteData(param);
            console.log('vote room',voteData);
            if(!voteData){
                return fn('没有投票数据');
            }
            socket.join(roomName);
            return fn(null,voteData);
        }
        if(roomName == SOCKET_ROOM_NAME.LIST){
            console.log('join list');
            const voteList = await this.voteManager.getVoteList();
            console.log('vote list',voteList);
            if(!voteList){
                return fn('没有投票数据');
            }
            socket.join(roomName);
            return fn(null,voteList);
        }


    }

}