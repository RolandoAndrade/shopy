<template>
    <div>
        <div
            class="space-around wrap mt-10 mb-10"
            style="height:max-content;"
            v-if="next === 0"
        >
            <img src="../assets/add-product.png" style="height:350px;" />
            <div class="column ">
                <Title size="title-secondary-big">Sell your product</Title>
                <ButtonSecondary v-on:click.native="next++" class="ml-10"
                    >Get start!</ButtonSecondary
                >
            </div>
        </div>
        <v-stepper v-model="next" vertical>
            <v-stepper-step :complete="next > 1" step="1" color="purple">
                <Title :size="'title-secondary'" class="mt-6"
                    >Select the category of your product
                </Title>
                <Title :size="'title-terciary'" class="mt-4"
                    >You can add as many as you want!</Title
                >
            </v-stepper-step>

            <v-stepper-content step="1" color="purple" class="column">
                <SelectCategories
                    @nextStep="getCategories"
                    v-on:goBack="$router.push('/products')"
                />
            </v-stepper-content>

            <v-stepper-step :complete="next > 2" step="2" color="purple">
                <Title :size="'title-secondary'"
                    >Tell us about your product
                </Title>
            </v-stepper-step>

            <v-stepper-content step="2">
                <SelectInfo @nextStep="getProducts" v-on:goBack="next--" />
            </v-stepper-content>

            <v-stepper-step :complete="next > 3" step="3" color="purple">
                <Title :size="'title-secondary'"
                    >Give us some images of your product!</Title
                >
            </v-stepper-step>

            <v-stepper-content step="3">
                <AddImages @nextStep="getImages" v-on:goBack="next--" />
            </v-stepper-content>

            <v-stepper-step step="4" color="purple">
                <Title :size="'title-secondary'">That's it!</Title>
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
import { Component, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import SelectCategories from '@/components/products/create-product/SelectCategories.vue';
import SelectInfo from '@/components/products/create-product/SelectInfo.vue';
import AddImages from '@/components/products/create-product/AddImages.vue';
import ProductResume from '@/components/products/create-product/ProductResume.vue';
import Title from '@/components/typography/Title.vue';
import Icon from '@/components/typography/Icon.vue';
import { Product } from '@/requests/products/Product';

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
    private images: Array<File> = [];
    private categories: Array<object> = [];
    private next = 0;
    private product!: Product;

    private nextStep() {
        this.next++;
    }

    private getProducts(product: Product) {
        console.log(product);
        this.product = product;
        this.nextStep();
    }

    private getImages(images: Array<File>) {
        this.images = images;
        this.nextStep();
    }

    private getCategories(categories: Array<object>, category: string) {
        this.categories = categories;
        console.log(categories, category);
        this.nextStep();
    }
}
</script>

<style>
.white {
    color: white;
}
.v-stepper {
    font-size: 7rem !important;
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
    font-size: 32px !important;
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
