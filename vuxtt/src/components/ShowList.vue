<template>

  <div>
    <group label-width="5em" title="投票列表:">
      <template v-if="vote.length">
        <cell-box primary="title"
                  align-items="flex-start" v-for="item in vote" @click.native="clickItem(item.id)"
                  :title="item.title" :key="item.id" is-link>
          <flexbox orient="vertical">
            <flexbox-item>
              {{item.title}}
            </flexbox-item>
            <flexbox-item class="flex-demo">
              <flexbox>
                <flexbox-item>
                  {{new Date(item.time).toLocaleString()}}
                </flexbox-item>
                <flexbox-item :style="{color:item.outDated?'red':'blue'}">
                  {{new Date(item.endTime).toLocaleString()}}
                </flexbox-item>
              </flexbox>

            </flexbox-item>
          </flexbox>

        </cell-box>
      </template>
      <template v-else>
        <p>No vote left!</p>
      </template>
    </group>
    <div style="padding:15px 25%;">
      <x-button class="mybtn" type="primary" text="返回" @click.native="goBack"></x-button>
    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, CellBox} from 'vux';

  export default {
    name: "show-list",
    components: {
      Flexbox,
      FlexboxItem,
      CellBox
    },
    computed: {
      vote() {
        if (!this.$store.state.voteList) {
          return [];
        }
        const result = [];
        for (const item of this.$store.state.voteList) {
          result.push({
            id: item.id,
            title: item.title,
            time: item.time,
            endTime:item.endTime,
            outDated:item.endTime<Date.now(),
          })
        }
        return result;
      }
    },
    data() {
      return {
        // vote: [
        //   {
        //     id: "ccxx",
        //     title: 'aaaaa 22',
        //     time: 1527862823373,
        //   },
        //   {
        //     id: "34324",
        //     title: 'vvccdfsafdsafdsfdsfc',
        //     time: 1527602823373,
        //   }
        // ],
      }
    },
    methods: {
      clickItem(id) {
        console.log('click id', id);
        this.$router.push('/showvote/' + id);
      },
      goBack() {
      //  this.$goBack();
        this.$router.replace('/');
      }
    },
    created(){
      this.$sclient.joinList();
    },
    sockets:{
      connect(){
        console.log('show list connect');
        this.$sclient.joinList();
      }
    },
    mounted(){
    //  this.$sclient.joinList();
    }
  }
</script>

<style scoped>
  .flex-demo {
    color: grey;
    border-radius: 4px;
    background-clip: padding-box;
  }
</style>
