import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        pageData: [
            {type: 1, text: 'aaa'},
            {type: 2, text: 'bbb'},
            {type: 3, imageUrl: '', loading: false}
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