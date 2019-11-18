import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        systeminfo: uni.getSystemInfoSync(),
        imgsrc: 'https://cdn.xiongmaolaoshi.com/panda/static/home/'
    },
    mutations: {},
    actions: {}
})
export default store
