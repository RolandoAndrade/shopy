<template>
    <div>
        <div
                class="product-detail-container to-column space-between"
                style="margin:40px auto;width:90%"
        >
            <ProductImages :product="product" class="mx-12" />
            <ProductDetail :product="product" :onlyDetails="true"/>
        </div>
        <div color="white" class="card-finish mb-12 mt-6">
            <v-row justify="center">
                <v-card v-for="(i,k) in categories" :key="k" class="title-terciary pa-4 ma-4" shaped color="primary" dark>
                    {{i.name}}
                </v-card>
            </v-row>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="publishProduct" :isLoading="this.isLoading"
                >{{this.$language.get('sell.step-4.btn-publish')}}!</ButtonSecondary
            >
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')"
                >{{this.$language.get('sell.btn-back')}}</ButtonSecondary
            >
        </div>
        <Popup
            ref="successModal"
            message="Your product has been successfuly published!"
            :response="true"
        />
    </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import { Product } from '@/requests/products/Product';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Popup from '@/components/generic/Popup.vue';
import Vue from 'vue';
import {Category} from "@/requests/category/Category";
import {productCreation} from "@/store/namespaces";
import {PRODUCT_CREATION_CREATE} from "@/store/products/actions/product.creation.actions";
import ProductImages from "@/components/products/ProductImages.vue";
import ProductDetail from "@/components/products/ProductDetail.vue";

@Component({
    components: {
        ProductDetail,
        ProductImages,
        Title,
        ButtonSecondary,
        Popup
    }
})
export default class ProductResume extends Vue {
    @Prop() product!: Product;
    @Prop() categories!: Array<Category>;
    isLoading: boolean = false;

    $refs!: {
        successModal: any;
    };


    public async publishProduct() {
        this.isLoading = true;
        const f = await this.createProduct({
            product: this.product,
            categories: this.categories
        });
        this.isLoading = false;
        this.$refs.successModal.openModal();
        this.$router.push("/products")
    }

    @productCreation.Action(PRODUCT_CREATION_CREATE) createProduct!: Function;
}
</script>

<style></style>
