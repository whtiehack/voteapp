<template>
    <div>
        <div style="padding:15px 25%;">
            <x-button  plain type="primary" text="返回首页" @click.native="toHome"></x-button>
        </div>
    </div>
</template>

<script>
	export default {
        name: "not-found",
        methods:{
            toHome(){
                this.$router.replace('/');
            }
        }
	}
</script>

<style scoped>

</style>
