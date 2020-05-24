<template>
    <div>
        <div class="flex wrap ma-2 container-space">
            <v-fade-transition
                group
                class="flex wrap ma-2 container-space"
            >
                <ProductCard
                    v-for="(n, k) in this.listOfProducts"
                    :key="k"
                    :product="n"
                    :condition="'catalog'"
                >
                </ProductCard>
            </v-fade-transition>
        </div>
        <div class="text-center margin-medium">
            <v-pagination
                v-if="howManyPageAre > 0"
                total-visible="10"
                v-model="currentPage"
                :length="howManyPageAre"
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
import Vue from 'vue';
import Component from 'vue-class-component';

import Icon from '../typography/Icon.vue';
import { Product } from '@/requests/products/Product';
import ProductCard from '@/components/cards/ProductCard.vue';
import { productsView } from '@/store/namespaces';
import {
    HOW_MANY_PAGES_ARE,
    LIST_OF_PRODUCTS
} from '@/store/products/getters/products.view.getters';
import { PRODUCTS_VIEW_FETCH_ALL_PRODUCTS } from '@/store/products/actions/products.view.actions';

@Component({
    components: {
        ProductCard,
        Icon
    }
})
export default class ProductCatalog extends Vue {
    private currentPage = 1;
    private pageSize = 6;

    changePage() {}

    async mounted() {
        await this.fetchProducts();
    }

    @productsView.Getter(LIST_OF_PRODUCTS) listOfProducts!: Product[];
    @productsView.Getter(HOW_MANY_PAGES_ARE) howManyPageAre!: number;
    @productsView.Action(PRODUCTS_VIEW_FETCH_ALL_PRODUCTS)
    fetchProducts!: Function;
}
</script>

<style scoped>
.none {
    text-decoration: none;
    color: black;
}
</style>
