
# 交互式投票 App

----

练手Vue 和 Socket.io 写的一个投票App

## 特点
* 投票结果实时反馈。
* 无需登录注册。
* 可以重新投票。
* 可以查看投票列表。
* 可以选择在投票列表中隐藏。
* 投票可以填写备注
* 可以设置投票过期时间。


## 说明

* 后端没有写存储，直接用的文件存储。偷懒了。不过数据部分都是用的Promise，随时可以改写。
* 前后端共享代码没想出好的方式。用的方法很low。


## 技术栈

* 前端
	1. Vue.js
	2. Vuex
	3. vue-router
	4. vue-socket.io
	1. vux

* 后端
	1. socket.io
	2. nodejs
	3. typescript





### 服务端

* 安装

```
cd server
npm install
npm run dev

```

* 编译

```
cd server
npm run build
```

### 客户端

* 调试

```
cd vuxtt
npm install
npm run dev
```

* 编译

```
cd vuxtt
npm run build
```

### DEMO

[https://votedemo.yoyo520.xyz](https://votedemo.yoyo520.xyz)



## 放几张图说明这个程序能跑 (话说README图片怎么缩放？？ )

* [screenshot/1.png](./screenshot/1.png)
* [screenshot/2.png](./screenshot/2.png)
* [screenshot/3.png](./screenshot/3.png)
* [screenshot/4.png](./screenshot/4.png)
* [screenshot/5.png](./screenshot/5.png)
* [screenshot/6.png](./screenshot/6.png)





