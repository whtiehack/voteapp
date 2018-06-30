<template>
  <div>
    <!-- 内容 -->
    <div v-if="voteData">
      <x-input title="标题:" :value="voteData.title" readonly>
      </x-input>
      <x-textarea :rows="2" title="备注:" readonly :value="voteData.remarks+hideStr"></x-textarea>

      <group title="选择选项：">
        <radio :options="opinionObj" v-model="radioIdx" @on-change="selectChange">

        </radio>
      </group>

      <!-- 选中的投票信息-->
      <div>
        <tab :line-width=1 active-color='green' v-model="tabIndex" custom-bar-width="0">
          <tab-item class="vux-center" :selected="curSelectName === item" v-for="(item, idx1) in voteData.opinions"
                    @click="curSelectName = item" :key="idx1" @on-item-click="tabClicked">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="tabIndex" height="100px" :show-dots="false">
          <swiper-item v-for="(item, idx2) in voteData.opinions" :key="idx2">
            <div class="tab-swiper">
              <template v-if="voteData.votes && voteData.votes[idx2] && voteData.votes[idx2].length">
                      <span v-for="(vote,idx3) in voteData.votes[idx2]" :key="idx3" @click="remark = vote[1]" v-bind:style="{'background-color':idx3%2?'#f0f0f0':''}">
                {{vote[0]+(vote[1]?'('+vote[1]+')':'')+', '}}
              </span>
              </template>
              <span v-else>
                {{'no vote'}}
              </span>
            </div>
          </swiper-item>
        </swiper>
        <!--可选的备注-->
        <x-input  v-model="name" placeholder="填写大名" title="姓名:"></x-input>
        <x-input  v-model="remark" placeholder="备注(选填)"></x-input>
      </div>
      <flexbox>
        <flexbox-item :span="7">
          <x-button type="primary" :text="voteBtnText" @click.native="voteClick" :disabled="outDated || hasVoted===1"></x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button plain type="primary" text="查看统计结果" @click.native="clickShowResult"></x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-else class="vux-center">
      {{loadingStr}}
    </div>
    <div style="padding:15px 25%;">
      <x-button plain type="primary" text="返回" @click.native="goBack"></x-button>
    </div>

  </div>
</template>

<script>
  import {
    XTextarea, Flexbox, FlexboxItem, Radio,
    Tab, TabItem, Swiper, SwiperItem
  } from 'vux';
  import {showModuleAlert} from "../utils";

  export default {
    name: "show-vote",
    props: ['voteid'],
    components: {
      XTextarea,
      Flexbox, Radio,
      FlexboxItem, Tab, TabItem, SwiperItem, Swiper,
    },
    watch:{
      ["$route"](to,from){
        // console.log('router change',to,from);
        // console.log('vote id',this.voteid,'to id',to.params.voteid);
        this.voteid = to.params.voteid;
        this.joinVote();
      }
    },
    data() {
      return {
        radioIdx: 0,
        tabIndex: 0,
        curSelectName: '',
        remark:'',
        outDated:false,
        name:'',
        loadingStr:'loading....',
        hideStr:'',
      }
    },
    computed: {
      voteBtnText(){
        if(this.outDated){
          return '投票过期了';
        }
        if(this.hasVoted === 1){
          return '投过了';
        }else if(this.hasVoted === 2){
          return '重新投票'
        }
        return '投票';
      },
      voteData() {
        return this.$store.state.voteDatas[this.voteid];
      },
      opinionObj() {
        if (this.voteData) {
          return this.voteData.opinions.map((tmp, idx) => {
            return {key: idx + '', value: tmp};
          });
        }
        return null;
      },
      // 0 没投票 1 投过了 2 重新投票
      hasVoted(){
        const voted  = !!(this.voteData.votedNames[this.name] || this.voteData.votedNames[this.name] === 0);
        if(voted && this.voteData.canRevoting){
          if(this.voteData.votedNames[this.name]!== this.radioIdx){
            return 2;
          }
          // 比较备注
          const voteData = this.voteData.votes[this.radioIdx];
          if(!voteData){
            return 2;
          }
          for(const data of voteData){
            if(data[0] === this.name){
              console.log('找到投票了',data[1],this.remark)
              return data[1] === this.remark?1:2;
            }
          }
        }
        return voted?1:0;

      }
    },
    created() {
      console.log('!! show vote', this.voteid);
      this.$store.commit('updateTitle', 'loading...');

      if(localStorage.getItem('votename')){
        this.name = localStorage.getItem('votename');
      }

    },
    mounted(){
      console.log('!! mounted!! show vote');
      this.joinVote();
    },
    sockets:{
      connect(){
        console.log('!! show vote connect');
        if(this.$store.state.reconnect){
          this.$store.commit('changeReconnectState');
          this.joinVote();
        }
    //    this.joinVote();
      }
    },
    methods: {
      joinVote(){
        this.$showLoading();
        this.$sclient.joinVote(this.voteid).then((result)=>{
          console.log('!!!! voteData',this.$store.state.voteDatas[this.voteid],this.voteData,result);
          let title = '暂无数据';
          if (this.voteData) {
            if(this.voteData.hide){
              this.hideStr = '(这是一个隐藏投票)';
            }
            title = this.voteData.title + '-投票';
            this.outDated = this.voteData.endTime < Date.now();
          }
          document.title = title;
          this.$store.commit('updateTitle', title);
          this.$hideLoading();
        }).catch(err=>{
          console.log('joinVote err',err);
          this.loadingStr = err;
          this.$store.commit('updateTitle', err);
          this.$hideLoading();
        });
      },
      goBack() {
      //  this.$goBack();
        this.$router.replace('/showlist');
      },
      clickShowResult() {
        this.$router.replace('/result/' + this.voteid);
      },
      selectChange(value, label) {
        // 选项改变
        console.log('select change', value, label);
        this.tabIndex = parseInt(value);
      },
      tabClicked(index) {
        console.log('tab clicked', index);
        this.radioIdx = index;
      },
      voteClick() {
      //  this.$showLoading();
        if(!this.name){
          return showModuleAlert('没有填写大名');
        }
        localStorage.setItem('votename',this.name);
        this.$showLoading('通信中..');
        this.$sclient.clientVote({
          id:this.voteid,
          name:this.name,
          remark:this.remark,
          opinionIdx:this.radioIdx,
        }).then((result)=>{
          this.$hideLoading();
          showModuleAlert('投票成功 '+result);
        }).catch(err=>{
          this.$hideLoading();
          showModuleAlert(err);
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
</style>
