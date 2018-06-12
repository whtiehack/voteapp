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
        <tab :line-width=1 active-color='#fc378c' v-model="tabIndex" custom-bar-width="0">
          <tab-item class="vux-center" :selected="curSelectName === item" v-for="(item, idx1) in voteData.opinions"
                    @click="curSelectName = item" :key="idx1" @on-item-click="tabClicked">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="tabIndex" height="100px" :show-dots="false">
          <swiper-item v-for="(item, idx2) in voteData.opinions" :key="idx2">
            <div class="tab-swiper">
              <template v-if="voteData.votes && voteData.votes[idx2] && voteData.votes[idx2].length">
                      <span v-for="(vote,idx3) in voteData.votes[idx2]" :key="idx3">
                {{vote+', '}}
              </span>
              </template>
              <span v-else>
                {{'no vote'}}
              </span>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <flexbox>
        <flexbox-item :span="7">
          <x-button type="primary" text="投票" @click.native="goBack"></x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button plain type="primary" text="查看统计结果" @click.native="clickShowResult"></x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-else>
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
      }
    },
    computed: {
      voteData() {
        return this.$store.state.voteDatas[this.voteid];
      },
      opinionObj() {
        if (this.voteData) {
          let val = this.voteData.opinions.map((tmp, idx) => {
            return {key: idx + '', value: tmp};
          })
          return val;
        }
        return null;
      }
    },
    created() {
      console.log('!! show vote', this.voteid);
      let title = '暂无数据';
      if (this.voteData) {
        title = this.voteData.title + '-投票';
      }
      document.title = title;
      this.$store.commit('updateTitle', title);
    },
    methods: {
      goBack() {
        this.$goBack();
      },
      clickShowResult() {
        this.$router.push('/result/' + this.voteid);
      },
      selectChange(value, label) {
        // 选项改变
        console.log('select change', value, label);
        this.tabIndex = parseInt(value);
      },
      tabClicked(index) {
        console.log('tab clicked', index);
        this.radioIdx = index;
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
</style>
