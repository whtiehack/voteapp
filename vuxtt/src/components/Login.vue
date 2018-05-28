<template>
    <div>
        <banner title="登录&注册"></banner>
        <div>
            <group>
                <x-input  title="姓名：" @keyup.enter.native="nameEnter" style="padding:15px" v-model="username" :max="10" ref="nameinput"   placeholder="输入姓名"  ></x-input>
                <x-input title="密码：" ref="pwdInput" @keyup.enter.native="pwdEnter" style="padding:15px" type="password" :max="15"   v-model="password" placeholder="输入小秘密"></x-input>
            </group>
            <div style="padding:15px 25%;">
                <x-button  plain type="primary" text="登录&注册" @click.native="loginClick"></x-button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "login",
		data:function(){
			return {
				username:'',
				password:'',
                namefocus:true,
            }
        },
        methods:{
		    loginClick(){
		    	console.log('loginclick')
                this.$router.replace('/');
            },
            nameEnter(){
                this.$refs.pwdInput.focus()
            },
            pwdEnter(){
                this.loginClick();
            }
        },
        created(){
			console.log('login page',JSON.stringify(this.$refs),this.$refs.nameinput);
        },

	}
</script>

<style scoped>

</style>
