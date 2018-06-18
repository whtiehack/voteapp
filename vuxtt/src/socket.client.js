import {SOCKET_MESSAGE,SOCKET_ROOM_NAME,SOCKET_EVENT} from "sharecode/socketmessage.ts";


export class SocketClient {
  /**
   *
   * @type {SocketIOClient.Socket}
   */
  socket = null;
  /**
   *
   * @type {Store}
   */
  store = null;

  joinedRoom = {};
  constructor(socket,store){
    this.socket = socket;
    this.store = store;
  }

  /**
   *
   * @param voteData
   * @returns {Promise<any>}
   */
  createVote(voteData){
    return new Promise((resolve,reject)=>{
      console.log('create vote',voteData);
      this.socket.emit(SOCKET_MESSAGE.CREATE_VOTE,voteData,(err,result)=>{
        console.log('create result',err,result);
        if(err){
          return reject(err);
        }
        resolve(result);
      })
    })
  }

  clientVote(iVote){
    return new Promise((resolve,reject)=>{
      console.log('client vote',iVote);
      this.socket.emit(SOCKET_MESSAGE.VOTE,iVote,(err,result)=>{
        if(err){
          return reject(err);
        }
        this.store.commit('voteAddName',result);
        resolve(result);
      });
    })
  }

  joinVote(voteId){
    return new Promise((resolve,reject)=>{
      if(this.joinedRoom[voteId]){
        console.log('joinVote has been joined',voteId,this.joinedRoom[voteId]);
        return resolve(this.joinedRoom[voteId]);
      }
      this.joinedRoom[voteId] = true;
      this.socket.emit(SOCKET_MESSAGE.JOIN_ROOM,SOCKET_ROOM_NAME.VOTE_+voteId,voteId,(err,result)=>{
        console.log('join vote result',err,result);
        if(err){
          this.joinedRoom[voteId] = false;
          return reject(err);
        }
        this.joinedRoom[voteId] = result;
        this.store.commit('addVoteData',result);
        this.socket.on(SOCKET_EVENT.VOTE_ADD_NAME,iVote=>{
          console.log('vote add name',iVote);
          this.store.commit('voteAddName',iVote);
        });
        resolve(result);
      })
    })
  }

  // 显示列表页面
  joinList(){
    return new Promise((resolve,reject)=>{
      if(this.joinedRoom[SOCKET_ROOM_NAME.LIST]){
        console.log('join list has been joined',this.joinedRoom[SOCKET_ROOM_NAME.LIST]);
        return resolve(this.joinedRoom[SOCKET_ROOM_NAME.LIST]);
      }
      this.joinedRoom[SOCKET_ROOM_NAME.LIST] = true;
      this.socket.emit(SOCKET_MESSAGE.JOIN_ROOM,SOCKET_ROOM_NAME.LIST,'',(err,result)=>{
        console.log('join list result',err,result,'on',SOCKET_EVENT.VOTE_NOTIFY);
        if(err){
          this.joinedRoom[SOCKET_ROOM_NAME.LIST] = false;
          return reject(err);
        }
        this.joinedRoom[SOCKET_ROOM_NAME.LIST] = result;
        this.store.commit('addVoteSmall',result);
        this.socket.on(SOCKET_EVENT.VOTE_NOTIFY,smallVote=>{
          console.log('vote notify~~',smallVote);
          this.store.commit('addVoteSmall',[smallVote]);
        })
      })
    })
  }
}
