import Vue from 'vue';
import Vuex from 'vuex';
import storeExample from '@/store/store-example/store-example';
import productsView from '@/store/products/products.view';
import productDetail from '@/store/products/product.detail';
import productCreation from "@/store/products/product.creation";

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
        productsView,
        productDetail,
        productCreation
    }
});
