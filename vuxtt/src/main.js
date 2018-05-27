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
import NotFound from './components/NotFound';
import {AjaxPlugin} from 'vux'

Vue.use(AjaxPlugin)
Vue.use(VueRouter)

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
const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			title: '首页'
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
		path:'/login',
		component:Login,
		meta: {
			title: '登录&注册'
		}
	},
	{
		path:'*',
		component:NotFound,
		meata:{
			title:'404'
		}
	}
]

const router = new VueRouter({
	routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')
