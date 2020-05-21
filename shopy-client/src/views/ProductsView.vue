<template>
    <div>
        <v-row no-gutters v-if="isShow">
            <v-col :cols="3">
                <SideNavDrawer>
                    <ProductFilter :items="items" />
                </SideNavDrawer>
            </v-col>
            <v-col :cols="9">
                <ProductsCatalog />
            </v-col>
        </v-row>
        <v-row v-else>
            <div class="width-cover">
                <ProductFilter :items="items" />
            </div>
            <ProductsCatalog />
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductsCatalog from '@/components/cards/ProductsCatalog.vue';
import SideNavDrawer from '@/components/layout/menus/SideNavDrawer.vue';
import ProductFilter from '@/components/products/ProductFilter.vue';
import { ProductFilterInterface } from '@/interfaces/productFilter.interface';
import { GET_CATEGORIES } from '@/store/products/getters/products.view.getters';
import { SectionInterface } from '@/interfaces/section.interface';
import { productsView } from '@/store/namespaces';
import { PRODUCTS_VIEW_FETCH_CATEGORIES } from '@/store/products/actions/products.view.actions';

@Component({
    components: {
        ProductsCatalog,
        SideNavDrawer,
        ProductFilter
    }
})
export default class ProductsView extends Vue {
    private render!: boolean;
    private windowSize = 0;

    get items(): ProductFilterInterface[] {
        return [
            {
                title: 'Categories',
                sections: this.getCategories
            },
            {
                title: 'Condition',
                types: [
                    {
                        name: 'Nuevo',
                        used: false,
                        icon: 'mdi-star'
                    },
                    {
                        name: 'Usado',
                        used: true,
                        icon: 'mdi-flash'
                    }
                ]
            },
            {
                title: 'Rating',
                rating: [5, 4, 3, 2, 1]
            }
        ];
    }

    get isShow() {
        return !this.$vuetify.breakpoint.smAndDown;
    }

    async mounted() {
        await this.fetchCategories();
    }

    @productsView.Getter(GET_CATEGORIES) getCategories!: SectionInterface[];
    @productsView.Action(PRODUCTS_VIEW_FETCH_CATEGORIES)
    fetchCategories!: Function;
}
</script>

<style lang="scss"></style>
