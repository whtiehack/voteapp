"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var socketmessage_1 = require("sharecode/socketmessage");
var vote_manager_1 = require("./vote.manager");
var SocketManager = /** @class */ (function () {
    function SocketManager(io) {
        this.io = io;
        this.bindEvent();
        this.voteManager = new vote_manager_1.VoteManager();
    }
    SocketManager.prototype.bindEvent = function () {
        this.io.on('connection', this.connection.bind(this));
    };
    SocketManager.prototype.connection = function (socket) {
        console.log('a user connected', socket.id);
        socket.emit('haha', 'gggg');
        this.bindSocketEvent(socket);
    };
    SocketManager.prototype.bindSocketEvent = function (socket) {
        var _this = this;
        socket.on(socketmessage_1.SOCKET_MESSAGE.CREATE_VOTE, this.createVote.bind(this));
        socket.on(socketmessage_1.SOCKET_MESSAGE.VOTE, this.clientVote.bind(this));
        socket.on(socketmessage_1.SOCKET_MESSAGE.JOIN_ROOM, function (room, param, fn) { return _this.joinRoom(socket, room, param, fn); });
    };
    SocketManager.prototype.createVote = function (msg, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var i, voteid, smallVote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('!! create vote', msg, typeof msg);
                        if (!msg || !msg.title || !msg.time || !msg.endTime || !msg.opinions) {
                            return [2 /*return*/, fn('参数错误')];
                        }
                        msg.votedNames = {};
                        msg.votes = [];
                        for (i = 0; i < msg.opinions.length; i++) {
                            msg.votes.push([]);
                        }
                        return [4 /*yield*/, this.voteManager.createVote(msg)];
                    case 1:
                        voteid = _a.sent();
                        if (!msg.hide) {
                            smallVote = this.voteManager.trans2SmallVote(msg);
                            console.log('notify list', socketmessage_1.SOCKET_EVENT.VOTE_NOTIFY, smallVote);
                            this.io.to(socketmessage_1.SOCKET_ROOM_NAME.LIST).emit(socketmessage_1.SOCKET_EVENT.VOTE_NOTIFY, smallVote);
                        }
                        fn(null, voteid);
                        return [2 /*return*/];
                }
            });
        });
    };
    SocketManager.prototype.clientVote = function (msg, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!msg || !msg.id || !msg.name) {
                            return [2 /*return*/, fn('参数错误')];
                        }
                        if (!msg.opinionIdx && msg.opinionIdx != 0) {
                            return [2 /*return*/, fn('没有选择选项')];
                        }
                        console.log('client vote', msg);
                        return [4 /*yield*/, this.voteManager.userVote(msg.id, msg.opinionIdx, msg.name, msg.remark)];
                    case 1:
                        result = _a.sent();
                        if (result != vote_manager_1.EnumVoteManageResultCode.SUCCESS) {
                            return [2 /*return*/, fn(result)];
                        }
                        // notify
                        this.io.to(socketmessage_1.SOCKET_ROOM_NAME.VOTE_ + msg.id).emit(socketmessage_1.SOCKET_EVENT.VOTE_ADD_NAME, msg);
                        return [2 /*return*/, fn(null, 'success')];
                }
            });
        });
    };
    SocketManager.prototype.joinRoom = function (socket, roomName, param, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var voteData, voteList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('join room', roomName, param);
                        if (!(roomName.indexOf(socketmessage_1.SOCKET_ROOM_NAME.VOTE_) >= 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.voteManager.getVoteData(param)];
                    case 1:
                        voteData = _a.sent();
                        console.log('vote room', voteData);
                        if (!voteData) {
                            return [2 /*return*/, fn('没有投票数据')];
                        }
                        socket.join(roomName);
                        return [2 /*return*/, fn(null, voteData)];
                    case 2:
                        if (!(roomName == socketmessage_1.SOCKET_ROOM_NAME.LIST)) return [3 /*break*/, 4];
                        console.log('join list');
                        return [4 /*yield*/, this.voteManager.getVoteList()];
                    case 3:
                        voteList = _a.sent();
                        console.log('vote list', voteList);
                        if (!voteList) {
                            return [2 /*return*/, fn('没有投票数据')];
                        }
                        socket.join(roomName);
                        return [2 /*return*/, fn(null, voteList)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SocketManager;
}());
exports.SocketManager = SocketManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0Lm1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc29ja2V0Lm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUFxRjtBQUVyRiwrQ0FBcUU7QUFFckU7SUFFSSx1QkFBNkIsRUFBUztRQUFULE9BQUUsR0FBRixFQUFFLENBQU87UUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVPLGlDQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLGtDQUFVLEdBQWxCLFVBQW1CLE1BQWE7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sdUNBQWUsR0FBdkIsVUFBd0IsTUFBYTtRQUFyQyxpQkFJQztRQUhHLE1BQU0sQ0FBQyxFQUFFLENBQUMsOEJBQWMsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsRUFBRSxDQUFDLDhCQUFjLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyw4QkFBYyxD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