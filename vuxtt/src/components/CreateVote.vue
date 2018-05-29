<template>
    <div >
        <banner title="创建投票"></banner>
        <div style="padding:0 15px;">
            <group title="创建投票：">
                <x-input placeholder="标题" ref="titleInput"  @keyup.enter.native="titleEnter"></x-input>
                <x-textarea style="" ref="desc" :max="200" @keyup.ctrl.enter.native="descEnter" :rows="2" name="description" placeholder="备注（可选）"></x-textarea>
            </group>
            <divider> 添加选项 </divider>
            <flexbox>
                <flexbox-item :span="10">
                    <group>
                        <x-input title="选项:" ref="opinioninput"  :max="55" @keyup.enter.native="addItem(true)"   v-model="curAddOpinion" placeholder="添加选项。。。"></x-input>
                    </group>
                </flexbox-item>
                <flexbox-item>
                    <x-button class="mybtn" type="default" text="+" v-on:click.native="addItem"></x-button>
                </flexbox-item>
            </flexbox>
            <div style="margin-top:10px;margin-bottom:10px;">
                <group title="投票选项：">
                    <cell v-for="(item,index) in items" :title="(index+1)+'. ' +item" :key="index">
                        <x-button  type="warn" text="X" v-on:click.native="delitem(index)"></x-button>
                    </cell>
                </group>
            </div>
            <div style="padding:15px 25%;">
                <x-button  type="primary" text="创建投票" v-on:click.native="addItem"></x-button>
                <x-button  type="warn" text="返回" @click.native="goBack"></x-button>
            </div>
        </div>
    </div>

</template>

<script>
import { XTextarea, Flexbox, FlexboxItem, GroupTitle } from "vux";
export default {
  components: {
    XTextarea,
    Flexbox,
    FlexboxItem,
    GroupTitle
  },
  name: "create-vote",
  data: function() {
    return {
      title: "",
      remarks: "",
      curAddOpinion: "",
      items: []
    };
  },
  created: function() {},
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        console.log('elel',el);
        el.focus();
      }
    }
  },
  methods: {
    addItem: function(focus) {
      if (!this.curAddOpinion) {
        return;
      }
      this.items.push(this.curAddOpinion);
      this.curAddOpinion = "";
      if (focus) {
        this.$refs.opinioninput.focus();
      }
    },
    delitem: function(idx) {
      this.items.splice(idx, 1);
    },
    titleEnter: function() {
      this.$refs.desc.focus();
    },
    descEnter: function() {
      this.$refs.opinioninput.focus();
    },
    goBack:function(){
      this.$router.replace('/');
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
