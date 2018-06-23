<template>
  <div>
    <div style="padding:0 15px;">
      <group title="创建投票：">
        <x-input placeholder="标题" v-model="title" ref="titleInput" @keyup.enter.native="titleEnter"></x-input>
        <x-textarea style="" ref="desc" v-model="remarks" :max="200" @keyup.ctrl.enter.native="descEnter" :rows="2"
                    name="description" placeholder="备注（可选）"></x-textarea>
        <x-switch title="在投票列表中隐藏" v-model="hideList" ></x-switch>
        <x-switch title="可以重新投票" v-model="canRevoting" ></x-switch>
        <datetime-range title="选择截止日期" :start-date="dateRangeBegin" :end-date="dateRangeEnd" format="YYYY年MM月DD日" v-model="endTime"></datetime-range>
      </group>
      <!-- 到期时间   在投票列表中隐藏。-->
      <divider> 添加选项</divider>
      <flexbox>
        <flexbox-item :span="10">
          <group>
            <x-input title="选项:" ref="opinioninput" :max="55" @keyup.enter.native="addItem(true)"
                     v-model="curAddOpinion" placeholder="添加选项。。。"></x-input>
          </group>
        </flexbox-item>
        <flexbox-item>
          <x-button class="mybtn" type="default" text="+" v-on:click.native="addItem"></x-button>
        </flexbox-item>
      </flexbox>
      <div style="margin-top:10px;margin-bottom:10px;">
        <group title="投票选项：">
          <cell v-for="(item,index) in items" :title="(index+1)+'. ' +item" :key="index">
            <x-button type="warn" text="X" v-on:click.native="delitem(index)"></x-button>
          </cell>
        </group>
      </div>
      <div style="padding:15px 25%;">
        <x-button type="primary" text="创建投票" v-on:click.native="createVote"></x-button>
        <x-button type="warn" text="返回" @click.native="goBack"></x-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {XTextarea, Flexbox, FlexboxItem, XSwitch,DatetimeRange,
    GroupTitle, CellBox} from "vux";
  import {showModuleAlert} from "../utils";
  import * as Message from 'sharecode/socketmessage.ts';

  function padTime(val){
    val = '00'+val;
    return val.slice(val.length-2);
  }
  function getDateTime(nowDate){
    return nowDate.getFullYear()+'-'+padTime(nowDate.getMonth()+1)+'-'+padTime(nowDate.getDate());
  }
  export default {
    components: {
      XTextarea,
      Flexbox,
      FlexboxItem,
      GroupTitle,
      CellBox,
      XSwitch,
      DatetimeRange,
    },
    name: "create-vote",
    data: function () {
      return {
        title: "",
        // 备注
        remarks: "",
        curAddOpinion: "",
        items: [],
        // 在列表中隐藏
        hideList:false,
        // 可以重新投票
        canRevoting:true,
        dateRangeBegin:'2018-06-11',
        dateRangeEnd:'2018-06-12',
        endTime:[],
      };
    },
    created: function () {
      // 先登录
      const nowDate = new Date();
      this.dateRangeBegin = getDateTime(nowDate);
      nowDate.setDate(nowDate.getDate()+5);
      this.dateRangeEnd = getDateTime(nowDate);
      this.endTime.push(this.dateRangeBegin);
      this.endTime.push(padTime(nowDate.getHours()+1));
      this.endTime.push(padTime(nowDate.getMinutes()));
      console.log('datetime',this.dateRangeBegin,this.dateRangeEnd,this.endTime);
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          console.log('elel', el);
          el.focus();
        }
      }
    },
    methods: {
      addItem: function (focus) {
        if (!this.curAddOpinion) {
          return;
        }
        this.items.push(this.curAddOpinion);
        this.curAddOpinion = "";
        if (focus) {
          this.$refs.opinioninput.focus();
        }
      },
      delitem: function (idx) {
        this.items.splice(idx, 1);
      },
      titleEnter: function () {
        this.$refs.desc.focus();
      },
      descEnter: function () {
        this.$refs.opinioninput.focus();
      },
      goBack: function () {
      //  this.$goBack();
        this.$router.replace('/');
      },
      async createVote(){
        if(!this.title ||!this.items.length){
          return showModuleAlert('标题没写，或者没有填写选项');
        }
        const endTime = new Date(this.endTime[0]);
        endTime.setHours(this.endTime[1]);
        endTime.setMinutes(this.endTime[2]);
        if(endTime.getTime()<Date.now()){
          return showModuleAlert('截止日期不对');
        }
        const voteData = {
          title:this.title,
          time:Date.now(),
          endTime:endTime.getTime(),
          remarks:this.remarks,
          opinions:this.items,
          hide:this.hideList,
          canRevoting:this.canRevoting,
        };
      //  await showModuleAlert('haha');
        this.$sclient.createVote(voteData).then(voteid=>{
          this.$router.replace('/showvote/'+voteid);
        }).catch(err=>{
          return showModuleAlert(err);
        });
      }
    }
  };
</script>

<style scoped>
  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    border-radius: 4px;
    background-clip: padding-box;
  }

  .mybtn {
    margin-top: 18px;
  }
</style>
