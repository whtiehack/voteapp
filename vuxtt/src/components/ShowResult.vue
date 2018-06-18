<template>
  <div>
    <div v-if="voteData">
      <div style="padding:15px;word-wrap:break-word; word-break:break-all;" v-html="result">
      </div>
    </div>
    <div v-else class="vux-center">
      {{' no data, may be loading'}}
    </div>
    <div style="padding:15px 25%;">
      <x-button plain type="primary" text="返回" @click.native="goBack"></x-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowResult",
    props: [
      'voteid'
    ],
    computed:{
      voteData() {
        return this.$store.state.voteDatas[this.voteid];
      },
      result(){
        const vote = this.voteData;
        if(!vote){
          return '';
        }
        const resultArr = [];
        resultArr.push(`<h2>${vote.title}</h2>`);
        resultArr.push('<p style="color:grey;">');
        resultArr.push(vote.remarks);
        resultArr.push('</p>');
        resultArr.push('<br>');
        for(let idx = 0;idx<vote.opinions.length;idx++){
          const opinion = vote.opinions[idx];
          const idxStr = idx+1;
          resultArr.push(idxStr+'. <b>'+opinion+'</b>:<br>');
          if(vote.votes[idx]){
            const voteData = vote.votes[idx];
            for(const v of voteData){
              resultArr.push(v[0]);
              if(v[1]){
                resultArr.push(':<i style="color:grey;">');
                resultArr.push(v[1]);
                resultArr.push('</i>');
              }
              resultArr.push('<br>');
            }
            resultArr.push('<br>');
          }
        }
        return resultArr.join('');
      }
    },
    created() {
      console.log('voteid : ', this.voteid);

    },
    mounted(){
      this.joinVoteRoom();
    },
    sockets:{
      connect(){
        console.log('~~ show result connect');
        this.joinVoteRoom();
      }
    },
    data(){
      return {
      //  result:'loading....'
      }
    },
    methods: {
      joinVoteRoom(){
        this.$sclient.joinVote(this.voteid).then((result)=>{
          let title = '暂无数据';
          if (this.voteData) {
            title = this.voteData.title + '-投票';
          }
          document.title = title;
          this.$store.commit('updateTitle', title);
          if(!this.voteData){
            return;
          }
          document.title = '投票结果 :' + this.voteid;
          this.$store.commit('updateTitle', '投票结果 :' + this.voteid);

        }).catch(err=>{
          console.log('joinVote err',err);
          this.$store.commit('updateTitle', err);
        });
      },
      goBack() {
      //  this.$goBack();
        this.$router.replace('/showvote/'+this.voteid);
      }

    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
</style>
