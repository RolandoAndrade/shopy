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
import { carts, productsView, user } from '@/store/namespaces';
import { PRODUCTS_VIEW_FETCH_CATEGORIES } from '@/store/products/actions/products.view.actions';
import { FETCH_CART } from '@/store/carts/actions/carts.actions';
import { USER_GET_USER } from '@/store/users/getters/user.getters';
import { User } from '@/requests/users/User';

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
                title: this.$language.get('filters.categories.name'),
                sections: this.getCategories
            },
            {
                title: this.$language.get('filters.condition.name'),
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
                title: this.$language.get('filters.rating'),
                rating: [5, 4, 3, 2, 1]
            }
        ];
    }

    get isShow() {
        return !this.$vuetify.breakpoint.smAndDown;
    }

    async mounted() {
        await this.fetchCategories();
        await this.fetchCart(this.user);
    }

    @productsView.Getter(GET_CATEGORIES) getCategories!: SectionInterface[];
    @productsView.Action(PRODUCTS_VIEW_FETCH_CATEGORIES)
    fetchCategories!: Function;

    @user.Getter(USER_GET_USER) user!: User;
    @carts.Action(FETCH_CART) fetchCart!: Function;
}
</script>

<style lang="scss"></style>
