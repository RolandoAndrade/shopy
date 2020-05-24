<template>
    <div>
        <template>
            <v-list-item two-line class="text-center">
                <v-list-item-content>
                    <v-list-item-title class="title-terciary">{{
                        search
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                        >{{ this.total }} results</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item link @click="searchAll()">
                <v-list-item-action class="ml-2">
                    <v-icon style="font-size: 20px !important;"
                        >mdi-shopping</v-icon
                    >
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="fs-sp"
                        >{{this.$language.get('generic.all-products')}}</v-list-item-title
                    >
                </v-list-item-content>
            </v-list-item>
            <div v-for="(item, w) in items" :key="w">
                <v-subheader class="overline ml-2">{{ item.title }}</v-subheader>
                <v-list-group
                    v-for="(section, j) in item.sections"
                    v-model="section.open"
                    :key="j"
                >
                    <template v-slot:appendIcon>
                        <v-icon style="font-size: 15px !important;">{{
                            section.openIcon
                        }}</v-icon>
                    </template>
                    <template v-slot:activator>
                        <v-list-item-action class="ml-2">
                            <v-icon
                                x-small
                                style="font-size: 20px !important;"
                                >{{ section.icon }}</v-icon
                            >
                        </v-list-item-action>
                        <v-list-item-content class="ml-n4">
                            <v-list-item-title class="fs-sp">
                                {{ section.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item-group>
                        <v-list-item
                            v-for="(sub, k) in section.children"
                            :key="k"
                            class="pl-2"
                            @click="searchCategory(sub.id)"
                        >
                            <v-list-item-action>
                                <v-icon
                                    color="primary"
                                    style="font-size: 10px !important;"
                                    class="ml-4"
                                    >mdi-circle</v-icon
                                >
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title class="fs-sp">{{
                                    sub.name
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
                <v-list-item v-for="(child, i) in item.types" :key="i" link>
                    <v-list-item-action class="ml-2">
                        <v-icon x-small style="font-size: 20px !important;">{{
                            child.icon
                        }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="fs-sp">{{
                            child.name
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-for="(child, i) in item.rating"
                    :key="i"
                    link
                    class="ml-4"
                >
                    <Icon
                        v-for="n in child"
                        :key="n"
                        :size="'icon-small'"
                        :color="'orange-i'"
                        :icon="'icon-star-full'"
                        class="mr-1"
                    />
                </v-list-item>
            </div>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import Icon from '@/components/typography/Icon.vue';
import { ProductFilterInterface } from '@/interfaces/productFilter.interface';
import Component from 'vue-class-component';
import Vue from 'vue';
import { productsView } from '@/store/namespaces';
import {
    PRODUCTS_VIEW_FETCH_ALL_PRODUCTS,
    PRODUCTS_VIEW_SEARCH_BY_CATEGORIES
} from '@/store/products/actions/products.view.actions';
import {
    GET_SEARCH,
    GET_TOTAL_PRODUCTS
} from '@/store/products/getters/products.view.getters';

@Component({
    components: {
        Icon
    }
})
export default class ProductFilter extends Vue {
    @Prop() items!: Array<ProductFilterInterface>;

    private lastSearch = 0;

    async searchCategory(id: number) {
        if (id != this.lastSearch) {
            await this.searchByCategories(id);
            this.lastSearch = id;
        } else {
            await this.searchAll();
            this.lastSearch = 0;
        }
        console.log(this.total);
    }

    async searchAll() {
        await this.searchAllProducts();
    }

    @productsView.Action(PRODUCTS_VIEW_SEARCH_BY_CATEGORIES)
    searchByCategories!: Function;
    @productsView.Action(PRODUCTS_VIEW_FETCH_ALL_PRODUCTS)
    searchAllProducts!: Function;
    @productsView.Getter(GET_TOTAL_PRODUCTS) total!: number;
    @productsView.Getter(GET_SEARCH) search!: string;
}
</script>

<style>
.fs-sp {
    font-size: 10px !important;
    font-weight: lighter !important;
}
</style>
