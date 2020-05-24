<template>
<div style="width:300px;">
    <div class="search" v-if="!this.$vuetify.breakpoint.xs">
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
    </div>
     <div class="flex" v-else>
                <div class="ml-4" style="width:cover;" v-if="expand===true">
                    <v-text-field  color="purple2"  single-line hide-details style="width:100%;"></v-text-field>
                </div>
                <v-btn icon class="mr-2" v-on:click="expandSearch">
                    <v-icon large color="purple2">mdi-magnify</v-icon>
                </v-btn>  
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

    private expandSearch(){
        this.expand=true;
        this.$emit('onMobile');
    }
}
</script>

<style scoped>

</style>

