<template>
    <div class="vux-demo">
        <img class="logo" src="../assets/logo.png">
        <divider>{{title}}</divider>
    </div>
</template>

<script>
	export default {
		name: "banner",
        props:['title']
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
