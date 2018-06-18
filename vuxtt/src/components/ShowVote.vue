<template>
  <div>
    <!-- 内容 -->
    <div v-if="voteData">
      <x-input title="标题:" :value="voteData.title" readonly>
      </x-input>
      <x-textarea :rows="2" title="备注:" readonly :value="voteData.remarks"></x-textarea>

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
          <x-button type="primary" :text="voteBtnText" @click.native="voteClick" :disabled="outDated || hasVoted"></x-button>
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
    data() {
      return {
        radioIdx: 0,
        tabIndex: 0,
        curSelectName: '',
        remark:'',
        outDated:false,
        name:'',
        loadingStr:'loading....',
      }
    },
    computed: {
      voteBtnText(){
        if(this.outDated){
          return '投票过期了';
        }
        if(this.hasVoted){
          return '投过了';
        }
        return '投票';
      },
      voteData() {
        return this.$store.state.voteDatas[this.voteid];
      },
      opinionObj() {
        if (this.voteData) {
          let val = this.voteData.opinions.map((tmp, idx) => {
            return {key: idx + '', value: tmp};
          });
          return val;
        }
        return null;
      },
      hasVoted(){
        return !!(this.voteData.votedNames[this.name] || this.voteData.votedNames[this.name] === 0);

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
      this.$sclient.joinVote(this.voteid).then((result)=>{
        console.log('!!!! voteData',this.$store.state.voteDatas[this.voteid],this.voteData,result);
        let title = '暂无数据';
        if (this.voteData) {
          title = this.voteData.title + '-投票';
          if(this.voteData.endTime < Date.now()){
            this.outDated = true;
          }
        }
        document.title = title;
        this.$store.commit('updateTitle', title);

      }).catch(err=>{
        console.log('joinVote err',err);
        this.loadingStr = err;
        this.$store.commit('updateTitle', err);
      });
    },
    methods: {
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
        }).then(()=>{
          this.$hideLoading();
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
