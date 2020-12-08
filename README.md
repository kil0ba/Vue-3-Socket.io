<p align="center">
    <a href="https://github.com/MetinSeylan/Vue-Socket.io" target="_blank">
    <img width="250" src="https://raw.githubusercontent.com/MetinSeylan/Vue-Socket.io/master/docs/logo.png">
    </a>
</p> 

<p align="center">
  <a href="https://github.com/kil0ba/Vue-3-Socket.io"><img src="https://img.shields.io/github/stars/kil0ba/Vue-3-Socket.io.svg"/></a>
</p>
<p>Vue-3-Socket.io is a Vue 3 compatibility version of <a href="https://github.com/MetinSeylan/Vue-Socket.io">this repo</a><p>
<p>All thanks to its <a href="https://github.com/MetinSeylan">author</a></p>

###### Demo
- <a href="http://metinseylan.com/vuesocketio/" target="_blank">Chat Application</a>
- <a href="http://metinseylan.com" target="_blank">Car Tracking Application</a>

<p>
are you looking for old documentation? <a href="https://github.com/MetinSeylan/Vue-Socket.io/blob/master/docs/OLD_README.md">it's here</a>
</p>

#### 🚀 Installation
``` bash
npm install vue-3-socket.io --save
```
##### Using Connection String
``` javascript
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-3-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://metinseylan.com:1992',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: { path: "/my-app/" } //Optional options
}))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

##### Using socket.io-client Instance
``` javascript
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const options = { path: '/my-app/' }; //Options object to pass into SocketIO

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://metinseylan.com:1992', options), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

**Parameters**|**Type's**|**Default**|**Required**|**Description**
-----|-----|-----|-----|-----
debug|Boolean|`false`|Optional|Enable logging for debug
connection|String/Socket.io-client|`null`|Required|Websocket server url or socket.io-client instance
vuex.store|Vuex|`null`|Optional|Vuex store instance
vuex.actionPrefix|String|`null`|Optional|Prefix for emitting server side vuex actions
vuex.mutationPrefix|String |`null`|Optional|Prefix for emitting server side vuex mutations

#### 🌈 Component Level Usage

<p>If you want to listen socket events from component side, you need to add `sockets` object in Vue component, and every function will start to listen events, depends on object key</p>

``` javascript
new Vue({
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
        clickButton: function (data) {
            // $socket is socket.io-client instance
            this.$socket.emit('emit_method', data)
        }
    }
})
```

##### Dynamic Listeners

<p>If you need consuming events dynamically in runtime, you can use `subscribe` and `unsubscribe` methods in Vue component</p>

``` javascript
this.sockets.subscribe('EVENT_NAME', (data) => {
    this.msg = data.message;
});

this.sockets.unsubscribe('EVENT_NAME');
```

##### Defining handlers for events with special characters

<p>If you want to handle 'kebab-case', or "event with space inside it" events, then you have to define it via the following way</p>

``` javascript
export default {
  name: 'Test',
  sockets: {
    connect: function () {
      console.log('socket to notification channel connected')
    },
  },

  data () {
    return {
      something: [
         // ... something here for the data if you need.
      ]
    }
  },

  mounted () {
    this.$socket.subscribe("kebab-case", function(data) {
        console.log("This event was fired by eg. sio.emit('kebab-case')", data)
    })
  }
}
```

#### 🏆 Vuex Integration
<p>When you set store parameter in installation, `Vue-Socket.io` will start sending events to Vuex store. If you set both prefix for vuex, you can use `actions` and `mutations` at the same time. But, best way to use is just `actions`</p>

``` javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        "<MUTATION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    },
    actions: {
        "<ACTION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    }
})
```
