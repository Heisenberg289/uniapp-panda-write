import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        systeminfo: uni.getSystemInfoSync(),
        imgsrc: 'https://cdn.xiongmaolaoshi.com/write_name/',
        baseUrl: ''
    },
    getters: {
        getBaseUrl: state => state.baseUrl
    },
    mutations: {
        setBaseurl (state, src) {
            state.baseUrl = src
        },
    },
    actions: {}
})
export default store
