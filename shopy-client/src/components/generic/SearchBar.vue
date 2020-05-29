<template>
<div style="width:300px;" class="mr-2">
    <div class="search" >
        <input
            type="text"
            class="search__input"
            :placeholder="onMobile"
            v-model="searchTerm"
        />
        <button class="search__button" @click="search">
            <svg class="search__icon">
                <use xlink:href="../../assets//symbol-defs.svg#icon-search" />
            </svg>
        </button>
    </div>
   
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { productsView } from '@/store/namespaces';
import { PRODUCTS_VIEW_SEARCH } from '@/store/products/actions/products.view.actions';

@Component({})
export default class SearchBar extends Vue {
    public searchTerm = '';
    private expand = false;

    async search() {
        await this.searchProducts(this.searchTerm);
        await this.$router.push('/products');
    }

    @productsView.Action(PRODUCTS_VIEW_SEARCH) searchProducts!: Function;

  

     get onMobile() {
        if (this.$vuetify.breakpoint.smAndDown)
        return ' '
        else return 'Search your product'
    }
}
</script>

<style scoped>

</style>

