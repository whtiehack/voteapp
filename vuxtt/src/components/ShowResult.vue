<template>
  <div>

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
    created() {
      console.log('voteid : ', this.voteid);
      document.title = '投票结果 :' + this.voteid;
      this.$store.commit('updateTitle', '投票结果 :' + this.voteid);
    },
    methods: {
      goBack() {
        this.$goBack();
      }

    }
  }
</script>

<style scoped>

</style>
