<template>
    <form class="search" action="#">
        <input
            type="text"
            class="search__input"
            placeholder="Search your product"
            v-model="searchTerm"
        />
        <button class="search__button" @click="search">
            <svg class="search__icon">
                <use xlink:href="../../assets//symbol-defs.svg#icon-search" />
            </svg>
        </button>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { productsView } from '@/store/namespaces';
import { PRODUCTS_VIEW_SEARCH } from '@/store/products/actions/products.view.actions';

@Component({})
export default class SearchBar extends Vue {
    public searchTerm = '';

    async search() {
        await this.searchProducts(this.searchTerm);
        await this.$router.push('/products');
    }

    @productsView.Action(PRODUCTS_VIEW_SEARCH) searchProducts!: Function;
}
</script>

<style></style>
