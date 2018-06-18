"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_MESSAGE = {
    // 创建投票 。  VoteData . 返回投票id
    CREATE_VOTE: 'createVote',
    // 加入房间 参数是 SOCKET_ROOM_NAME
    JOIN_ROOM: 'joinRoom',
    // 投票 参数是 姓名，备注，投票id
    VOTE: 'vote',
};
// client event
exports.SOCKET_EVENT = {
    VOTE_NOTIFY: 'smallVote',
    VOTE_ADD_NAME: 'vote_addName',
};
exports.SOCKET_SERVER_PUSH = {};
exports.SOCKET_ROOM_NAME = {
    // 进入过主页的 join 这个 房间。
    HOME: 'room_home',
    // 进入的投票房间。 showVote 进入这个 房间，-后面是投票id 推送投票信息
    VOTE_: 'room-',
    // 进入过列表的房间 推送新投票
    LIST: 'room_list',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0bWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvY2tldG1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLGNBQWMsR0FBRztJQUM1Qiw0QkFBNEI7SUFDNUIsV0FBVyxFQUFDLFlBQVk7SUFDeEIsNEJBQTRCO0lBQzVCLFNBQVMsRUFBQyxVQUFVO0lBQ3BCLG9CQUFvQjtJQUNwQixJQUFJLEVBQUMsTUFBTTtDQUNaLENBQUM7QUFFRixlQUFlO0FBQ0YsUUFBQSxZQUFZLEdBQUc7SUFDMUIsV0FBVyxFQUFDLFdBQVc7SUFDdkIsYUFBYSxFQUFDLGNBQWM7Q0FDN0IsQ0FBQTtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsRUFFakMsQ0FBQztBQUVXLFFBQUEsZ0JBQWdCLEdBQUc7SUFDOUIscUJBQXFCO0lBQ3JCLElBQUksRUFBQyxXQUFXO0lBQ2hCLDRDQUE0QztJQUM1QyxLQUFLLEVBQUMsT0FBTztJQUNiLGlCQUFpQjtJQUNqQixJQUFJLEVBQUMsV0FBVztDQUNqQixDQUFDIn0=