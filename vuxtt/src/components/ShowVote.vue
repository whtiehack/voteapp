<template>
    <div>
        <!-- 内容 -->

        <div style="padding:15px 25%;">
            <x-button  plain type="primary" text="返回" @click.native="goBack"></x-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "show-vote",
  created(){
      document.title='xxxx-投票';
      this.$store.commit('updateTitle','xxxx-投票');
  },
  methods:{
      goBack(){
          this.$goBack();
      }
  }
};
</script>

<style scoped>
</style>
