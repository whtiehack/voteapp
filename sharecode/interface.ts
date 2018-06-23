

interface _Votes{
 [key:number]:string 
}

export interface VoteData{
  title:string;
  time:number;
  endTime:number;
  remarks:string;
  opinions:string[];
  votes:_Votes[][];
  // voted names
  votedNames:{[key:string]:number};
  // 在投票列表隐藏。 服务端字段
  hide?:boolean;
  // 是否可以重新投票
  canRevoting?:boolean;
  // 服务端字段 
  id?:string;
}

export interface SmallVote{
  id:string,
    title:string,
    time:number,
    endTime:number
}


// 接口
export interface IVote{
    id:string;
    name:string;
    opinionIdx:number;
    remark?:string;
}

// {
//   title: 'votetitle',
//   time: 0,
//   endTime:2342343,
//   remarks: '备注remarks备注',
//   opinions: [
//     'afdacB', '无敌中的人呀了了', 'hahahAAFDSFDShafdsafdskfdafdslfd', '77', '8888', '9dsfadsaf'
//   ],
//   votes: [
//     [['姓名','备注'],['姓321名','备4324注'],['姓ss名','']],
//     [],
//     [['fdaf','']]
//   ]
// }