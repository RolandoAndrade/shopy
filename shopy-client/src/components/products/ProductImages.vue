<template>
    <div class="product-images flex column">
        <div class="product__image-container">
            <v-img class="product__image-container__img" contain :src="image" />
            <div class="flex mt-8 mb-8" v-if="edit">
                <v-btn color="success" icon @click="uploadImage">
                    <v-icon medium>mdi-plus-circle</v-icon>
                </v-btn>
                <v-btn color="error" icon @click="deleteImage()">
                    <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
            </div>
        </div>
        <v-slide-group class="image-slider" center-active show-arrows color="purple">
            <v-slide-item v-for="(n, k) in images" :key="k" class="image-slider__img">
                <v-img contain :src="n.image" class="ma-2" @click="() => changePrimaryImg(k)" />
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { Product } from '@/requests/products/Product';
import Component, { mixins } from 'vue-class-component';
import UpdateImagesLoader from '../../mixins/update-images-loader.mixin';
import { Images } from '../../interfaces/productImages.interface';
import {ProductImage} from '../../requests/product-image/ProductImage';
import { productDetail } from '../../store/namespaces';
import {
    PRODUCTS_DETAIL_FETCH_PRODUCT

} from '../../store/products/actions/products.detail.actions';
@Component({})
export default class ProductImages extends mixins(UpdateImagesLoader) {
    @Prop() product!: Product;
    @Prop() edit?: boolean;
    private imageData: string | null = '';
    imagesDeleted: ProductImage[]=[];

    indexToShow = 0;

    get image() {
        try {
            return this.images[this.indexToShow].image;
        } catch (e) {
            return '';
        }
    }

    mounted() {
        for (let i = 0; i < this.product.productImages!.length; i++) {
            this.images.push({
                image: this.product.productImages![i].image,
                id: this.product.productImages![i].id
            });
        }
    }

    public changePrimaryImg(source: number) {
        this.indexToShow = source;
    }

    public bringData(){
        this.$emit('update',this.images,this.imagesDeleted, this.newImages)
    }

    public resetData(){
       this.images=this.productReset.productImages!;
    }

    public deleteImage() {
        if (this.images[this.indexToShow].id)
            this.imagesDeleted.push(this.images[this.indexToShow]);
            this.images.splice(this.indexToShow, 1);
    }

    @productDetail.Getter('GET_PRODUCT_DATA')
    productReset!: Product;
}
</script>

<style></style>
