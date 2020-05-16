<template>
    <div>
        <div class="flex wrap padding-medium container-space">
           
            <ProductCard v-for="(n,k) in this.listOfProducts" :key="k" :product="n">
            </ProductCard>

            
        </div>
        <div class="text-center margin-medium">
            <v-pagination
                total-visible="10"
                v-model="currentPage"
                :length="20"
                circle
                color="purple"
                @input="changePage()"
                class="xyz"
                style="font-size:50px !important;"
            ></v-pagination>
        </div>
    </div>
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";

import Icon from '../typography/Icon.vue';
import {Product} from "@/requests/products/Product";
import ProductCard from "@/components/cards/ProductCard.vue";
import {productsView} from "@/store/namespaces";
import {LIST_OF_PRODUCTS} from "@/store/products/getters/products.view.getters";


@Component({
    components: {
        ProductCard,
        Icon
    }
})
export default class ProductCatalog extends Vue {
    private currentPage: number = 1;
    private pageSize: number = 6;


    changePage()
    {

    }

    @productsView.Getter(LIST_OF_PRODUCTS) listOfProducts!: Product[];
}
</script>

<style scoped>
    .none{
        text-decoration:none;
        color:black;
    }
</style>