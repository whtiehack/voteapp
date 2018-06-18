export const SOCKET_MESSAGE = {
  // 创建投票 。  VoteData . 返回投票id
  CREATE_VOTE:'createVote',
  // 加入房间 参数是 SOCKET_ROOM_NAME
  JOIN_ROOM:'joinRoom',
  // 投票 参数是 姓名，备注，投票id
  VOTE:'vote',
};

// client event
export const SOCKET_EVENT = {
  VOTE_NOTIFY:'smallVote',
  VOTE_ADD_NAME:'vote_addName',
}

export const SOCKET_SERVER_PUSH = {

};

export const SOCKET_ROOM_NAME = {
  // 进入过主页的 join 这个 房间。
  HOME:'room_home',
  // 进入的投票房间。 showVote 进入这个 房间，-后面是投票id 推送投票信息
  VOTE_:'room-',
  // 进入过列表的房间 推送新投票
  LIST:'room_list',
};

