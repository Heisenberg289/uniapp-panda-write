import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        systeminfo: uni.getSystemInfoSync(),
        imgsrc: 'https://cdn.xiongmaolaoshi.com/write_name/'
    },
    mutations: {},
    actions: {}
})
export default store
