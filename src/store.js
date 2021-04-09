import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        pageData: [
            {id: 1, type: 1, text: 'sss'},
            {id: 2, type: 2, text: 'sfsfsfsefes'},
            {id: 3, type: 3, imageUrl: '', loading: false}
        ]
    },
    getters: {
        PAGE_DATA (state) {
            return state.pageData
        }
    },
    mutations: {},
    actions: {}
});

export default store;