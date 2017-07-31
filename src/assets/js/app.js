"use strict";

var state = {
    count: 100
}

var mutations = {
    INCREMENT: function(state) {
        state.count++
    }
}

var store = new Vuex.Store({
    state: state,
    mutations: mutations
})


Vue.config.debug = true

var sidebar = Vue.extend({
    template: '#sidebar',
    vuex: {
        getters: {
            // 一个状态的 getter 函数，将会把 `store.state.count` 绑定为 `this.count`
            count: function (state) {
                return state.count
            }
        },
        actions: {
            increment: increment
        }
    }
})

// 定义组件
var Foo = Vue.extend({
    template: '<p>This is foo!</p><my-component></my-component>',
    components: {
    // <my-component> 只能用在父组件模板内
        'my-component': sidebar
    }
})

var Bar = Vue.extend({
    template: '#child-template',
    components: {
    // <my-component> 只能用在父组件模板内
        'my-component': sidebar
    },
    vuex: {
        getters: {
            // 一个状态的 getter 函数，将会把 `store.state.count` 绑定为 `this.count`
            count: function (state) {
                return state.count
            }
        }
    }
})



// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({
    data: function () {
        return { message: 'hello' }
    },
    store: store,
})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter({history: true})

router.beforeEach(function (transition) {
    if (transition.to.auth) {

    }
    transition.next()
})

// 定义路由规则
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar,
        //auth: true // 这里 auth 是一个自定义字段
    },
})



// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '.app')

function increment (store) {
    store.dispatch('INCREMENT')
}
