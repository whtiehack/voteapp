<template>
    <div>
        <banner title="首页"></banner>
        <div style="padding:15px 25%;">
            <x-button class="mybtn" type="primary" text="查看投票" link="/showlist"></x-button>
            <x-button class="mybtn" plain type="primary" text="创建投票" link="/create"></x-button>
            <x-button class="mybtn" type="warn" text="即出登录" v-on:click.native="logout"></x-button>
        </div>


    </div>
</template>

<script>
    import {SERVER_URL} from '../utils';
    function getHaha(){
	    this.$http.get(SERVER_URL+'/11.txt').then(({data}) => {
		    console.log(data)
		    this.msg = data;
	    })
    }
	export default {
		data() {
			return {
				// note: changing this line won't causes changes
				// with hot-reload because the reloaded component
				// preserves its current state and we are modifying
				// its initial state.
				msg: 'Hello World!'
			}
		},
        methods:{
	        logout:function(){
		    	console.log('logout click');
		    	this.$router.push('/login');
            }
        },
		created() {
			getHaha.call(this);
		},
        destroyed(){
			console.log('home destoryed');
        }
	}
</script>

<style>


</style>
