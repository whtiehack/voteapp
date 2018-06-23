
import {VoteData,SmallVote} from 'sharecode/interface';

export enum EnumVoteManageResultCode{
    SUCCESS,
    REVOTING,
    NODATA = 'no vote data',
    VOTE_OUTDATED = 'vote outdated',
    VOTE_NO_OPINION = 'no opinion',
    VOTE_HAS_VOTED = 'has voted',
}

export class VoteManager {
    voteDatas:{[key:string]:VoteData} = {};
    voteIdxIncr:number = 0;
    constructor(storeObject?:{voteDatas:any,voteIdxIncr:number}){
        if(storeObject && storeObject.voteDatas){
            this.voteDatas = storeObject.voteDatas;
            this.voteIdxIncr = storeObject.voteIdxIncr;
        }
    }
    public getStoreObject(){
        return {voteDatas:this.voteDatas,voteIdxIncr:this.voteIdxIncr};
    }
    async createVote(voteData:VoteData){
        const voteId = await this.generateNewVoteId(voteData.hide);
        voteData.id = voteId;
        this.voteDatas[voteId] = voteData;
        return voteId;
    }

    trans2SmallVote(voteData:VoteData):SmallVote{
        return {
            id:voteData.id,
            title:voteData.title,
            time:voteData.time,
            endTime:voteData.endTime,
        }
    }

    async getVoteDatas():Promise<{[key:string]:VoteData}>{
        const result:{[key:string]:VoteData} = {} as any;
        for(let voteId in this.voteDatas){
            if(!this.voteDatas[voteId].hide){
                result[voteId] = this.voteDatas[voteId];
            }
        }
        return result;
    }

    // showlist
    async getVoteList():Promise<SmallVote[]>{
        const result:SmallVote[] = [] as any;
        for(const id in this.voteDatas){
            const item = this.voteDatas[id];
            if(item.hide){
                continue;
            }
            result.push({
                id,
                title:item.title,
                time:item.time,
                endTime:item.endTime
            })
        }
        return result;
    }

    async getVoteData(voteId:string){
        return this.voteDatas[voteId];
    }

    // 投票
    async userVote(voteId,voteIdx,name:string,remarks:string):Promise<EnumVoteManageResultCode>{
        const voteData = await this.getVoteData(voteId);
        if(!voteData){
            return EnumVoteManageResultCode.NODATA;
        }
        if(voteData.endTime<Date.now()){
            return EnumVoteManageResultCode.VOTE_OUTDATED;
        }
        if(!voteData.opinions[voteIdx]){
            return EnumVoteManageResultCode.VOTE_NO_OPINION;
        }
        let isRevoting = false;
        // check has voted
        if( voteData.votedNames[name] || voteData.votedNames[name] == 0){
            if(voteData.canRevoting){
                // 找到删除
                const idx = voteData.votedNames[name];
                const data = voteData.votes[idx];
                let delIdx = -1;
                for(let vIdx in data){
                    if(data[vIdx][0]==name){
                        delIdx = vIdx as any;
                        break;
                    }
                }
                if(delIdx==-1){
                    console.error('revoting find idx error',name,idx,data,voteId);
                }else{
                    isRevoting = true;
                    data.splice(delIdx,1);
                }
            }else{
                return EnumVoteManageResultCode.VOTE_HAS_VOTED;
            }
        }
        voteData.votedNames[name] = voteIdx;
        voteData.votes[voteIdx].push([name,remarks]);
        return isRevoting?EnumVoteManageResultCode.REVOTING:EnumVoteManageResultCode.SUCCESS;
    }

    private async generateNewVoteId(hide:boolean){
        if(hide){
            return Date.now()+'';
        }
        return ++this.voteIdxIncr + '';
    }
}


