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
              {{new Date(item.time).toLocaleString()}}
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
        if (!this.$store.state.voteDatas) {
          return;
        }
        const result = [];
        for (const id in this.$store.state.voteDatas) {
          const item = this.$store.state.voteDatas[id];
          result.push({
            id: id,
            title: item.title,
            time: item.time
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
        this.$goBack();
      }
    },
    created(){

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
