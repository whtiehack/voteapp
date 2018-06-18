<template>
  <div class="vux-demo">
    <img class="logo" src="../assets/logo.png">
    <divider>{{title}}</divider>
  </div>
</template>

<script>
  import {showModuleAlert} from "../utils";``
  export default {
    name: "banner",
    computed: {
      title() {
        return this.$store.state.title;
      }
    },
    created() {
      console.log('!!! banner created');
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
        this.$sclient.reconnectClear();
      },
      disconnect(){
        console.log('socket.io 断线了。');
      //  showModuleAlert('websocket 断线了。建议刷新一下页面');
      },
      async haha(val) {
        console.log('!~~! haha', val);
      }
    }
  }
</script>

<style scoped>
  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
