import Vue from 'vue';
import Vuex from 'vuex';
import storeExample from "@/store/store-example/store-example";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //no tocar
    },
    mutations: {
        //no tocar
    },
    actions: {
        //no tocar
    },
    modules: {
        //incluir módulos creados
        storeExample
    }
});
