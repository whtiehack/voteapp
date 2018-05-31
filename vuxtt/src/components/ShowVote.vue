<template>
    <div>
        <!-- 内容 -->
        <div v-if="voteData">
            <checklist title="选择选项：" ref="checklist" :options="opinionObj" v-model="opinionValue" :max="1" @on-change="selectChange"></checklist>
            
        </div>
        <div v-else>
        </div>
        <div style="padding:15px 25%;">
            <x-button  plain type="primary" text="返回" @click.native="goBack"></x-button>
        </div>
    </div>
</template>

<script>
import {Checklist} from 'vux';
export default {
  name: "show-vote",
  props:['voteid'],
  components:{
      Checklist,
  },
  data(){
      return {
        opinionValue:[],
      }
  },
  computed:{
      voteData(){
          return this.$store.state.voteDatas[this.voteid];
      },
      opinionObj(){
          if(this.voteData){
            let val = this.voteData.opinions.map((tmp,idx)=>{
                return {key:idx+'',value:tmp};
            })
            return val;
          }
          return null;
      }
  },
  created(){
      console.log('!! show vote',this.voteid);
      let title = '暂无数据';
      if(this.voteData){
          title = this.voteData.title + '-投票';
      }
      document.title=title;
      this.$store.commit('updateTitle',title);
  },
  methods:{
      goBack(){
          this.$goBack();
      },
      selectChange(value,label){
          // 选项改变
          console.log('select change',value,label);
          console.log('!! get full',this.$refs.checklist.getFullValue());
      }
  }
};
</script>

<style scoped>
</style>
