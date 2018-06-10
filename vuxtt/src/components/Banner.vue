<template>
    <div class="vux-demo">
        <img class="logo" src="../assets/logo.png">
        <divider>{{title}}</divider>
    </div>
</template>

<script>
	export default {
		name: "banner",
        computed:{
            title(){
                return this.$store.state.title;
            }
        },
        created(){
            console.log('!!! banner created');
        },
    sockets:{
      connect: function(){
        console.log('socket connected')
      },
		  haha(val){
		    console.log('!~~! haha',val);
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
