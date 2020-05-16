import Vue from 'vue';
import Vuex from 'vuex';
import storeExample from "@/store/store-example/store-example";
import productsView from "@/store/products/products.view";

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
        storeExample,
        productsView
    }
});
