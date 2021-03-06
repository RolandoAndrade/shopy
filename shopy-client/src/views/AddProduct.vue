<template>
    <div>
        <div
            class="space-around wrap mt-10 mb-10"
            style="height:max-content;"
            v-if="next === 0"
        >
            <img src="../assets/add-product.png" style="height:350px;" />
            <div class="column ">
                <Title size="title-secondary-big">{{
                    this.$language.get('sell.title')
                }}</Title>
                <ButtonSecondary v-on:click.native="next++" class="ml-10">{{
                    this.$language.get('sell.btn-start')
                }}</ButtonSecondary>
            </div>
        </div>
        <v-stepper v-model="next" vertical>
            <v-stepper-step :complete="next > 1" step="1" color="purple">
                <Title :size="'title-secondary'" class="mt-6"
                    >{{ this.$language.get('sell.step-1.title') }}
                </Title>
                <Title :size="'title-terciary'" class="mt-4">{{
                    this.$language.get('sell.step-1.subtitle')
                }}</Title>
            </v-stepper-step>

            <v-stepper-content step="1" color="purple" class="column">
                <SelectCategories
                    @nextStep="getCategories"
                    v-on:goBack="$router.push('/products')"
                />
            </v-stepper-content>

            <v-stepper-step :complete="next > 2" step="2" color="purple">
                <Title :size="'title-secondary'"
                    >{{ this.$language.get('sell.step-2.title') }}
                </Title>
            </v-stepper-step>

            <v-stepper-content step="2">
                <SelectInfo @nextStep="getProducts" v-on:goBack="next--" />
            </v-stepper-content>

            <v-stepper-step :complete="next > 3" step="3" color="purple">
                <Title :size="'title-secondary'">{{
                    this.$language.get('sell.step-3.title')
                }}</Title>
            </v-stepper-step>

            <v-stepper-content step="3">
                <AddImages @nextStep="getImages" v-on:goBack="next--" />
            </v-stepper-content>

            <v-stepper-step step="4" color="purple">
                <Title :size="'title-secondary'">{{
                    this.$language.get('sell.step-4.title')
                }}</Title>
            </v-stepper-step>

            <v-stepper-content step="4">
                <ProductResume
                    :product="product"
                    :categories="categories"
                    v-on:goBack="next--"
                />
            </v-stepper-content>
        </v-stepper>
    </div>
</template>

<script lang="ts">
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import SelectCategories from '@/components/products/create-product/SelectCategories.vue';
import SelectInfo from '@/components/products/create-product/SelectInfo.vue';
import AddImages from '@/components/products/create-product/AddImages.vue';
import ProductResume from '@/components/products/create-product/ProductResume.vue';
import Title from '@/components/typography/Title.vue';
import Icon from '@/components/typography/Icon.vue';
import { Product } from '@/requests/products/Product';
import { productCreation } from '@/store/namespaces';
import {
    PRODUCT_CREATION_CREATE,
    PRODUCT_CREATION_FETCH_CATEGORIES
} from '@/store/products/actions/product.creation.actions';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Category } from '@/requests/category/Category';
import { ProductImage } from '@/requests/product-image/ProductImage';

@Component({
    components: {
        ButtonSecondary,
        SelectCategories,
        SelectInfo,
        ProductResume,
        AddImages,
        Title,
        Icon
    }
})
export default class AddProduct extends Vue {
    private next = 0;
    private product: Product = new Product();
    private categories: Category[] = [];

    private nextStep() {
        this.next++;
    }

    private getProducts(product: Product) {
        this.product = product;
        this.nextStep();
    }

    private getImages(images: string[]) {
        this.product.productImages = images
            .filter(i => i)
            .map(i => new ProductImage(i));
        this.nextStep();
    }

    private getCategories(categories: Category[]) {
        this.categories = categories;
        this.nextStep();
    }

    async mounted() {
        await this.fetchCategories();
    }

    @productCreation.Action(PRODUCT_CREATION_FETCH_CATEGORIES)
    fetchCategories!: Function;
}
</script>

<style>
.white {
    color: white;
}
.v-stepper {
    font-size: 30px !important;
}
.v-select__selection,
.v-label--active {
    font-size: 16px !important;
}
.v-list-item__title,
.v-select__selection {
    padding: 4px;
}
.v-chip__content {
    font-size: 20px !important;
}
.v-label,
input,
label,
text-area {
    font-size: 16px !important;
}
.v-input__slot {
    padding-bottom: 0px;
}
.v-input {
    padding: 0;
}
.text-area {
    width: 10rem !important;
}
</style>
