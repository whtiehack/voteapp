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
    },
    created() {
      console.log('voteid : ', this.voteid);
      document.title = '投票结果 :' + this.voteid;
      this.$store.commit('updateTitle', '投票结果 :' + this.voteid);
      const vote = this.voteData;
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
          resultArr.push(vote.votes[idx].join('<br>')+'<br>');
          resultArr.push('<br>');
        }
      }
      this.result = resultArr.join('');

    },
    data(){
      return {
        result:''
      }
    },
    methods: {
      goBack() {
        this.$goBack();
      }

    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
</style>
