// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import HelloWorld from './components/HelloWorld';
import ShowList from './components/ShowList';
import Login from './components/Login';
import Banner from './components/Banner';
import CreateVote from './components/CreateVote';
import ShowVote from './components/ShowVote';
import NotFound from './components/NotFound';
import {AjaxPlugin} from 'vux'
import Vuex from 'vuex';

Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Vuex);

import {XButton, Box,Group, Cell,Divider,XInput,} from 'vux'
Vue.component('banner',Banner);
Vue.component('divider', Divider)
Vue.component('x-button', XButton)
Vue.component('box', Box)
Vue.component('cell', Cell)
Vue.component('group', Group)
Vue.component('x-input', XInput)
/*
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
 */
Vue.prototype.$goBack = function(){
	if(window.history.length <= 1){
		this.$router.push('/');
	}else{
		this.$router.go(-1);
	}
}

 
const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			title: '实时交互式投票-首页'
		}
	},
	{
		path:'/hello',
		component:HelloWorld,
		meta: {
			title: 'hello'
		}
	},
	{
		path:'/showlist',
		component:ShowList,
		meta: {
			title: '投票列表'
		}
	},
	{
		path:'/showvote/:voteid',
		component:ShowVote,
		props:true
	},
	{
		path:'/login',
		component:Login,
		meta: {
			title: '登录&注册'
		}
	},
	{
		path:'/create',
		component:CreateVote,
		meta: {
			title: '创建投票'
		}
	},
	{
		path:'*',
		component:NotFound,
		meta:{
			title:'404'
		}
	}
]
const store = new Vuex.Store({
  state: {
		title: '',
		voteDatas:{
			'ccxx':{
				title:'votetitle',
				remarks:'备注备注',
				opinions:[
					'afdac','fa aad中文acc'
				],
				votes:[
					['cc','bb'],
					[],
				]
			}
		}
  },
  mutations: {
    updateTitle (state,newTitle) {
			if(newTitle){
				state.title = newTitle;
			}
    }
  }
})
const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
		store.commit('updateTitle',to.meta.title);
	}
	
	console.log('to.fullpath',to.fullPath);
	next()
})
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')
