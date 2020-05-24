<template>
    <div class="product-images flex column">
        <div class="product__image-container">
            <v-img class="product__image-container__img" contain :src="image" />
            <div class="flex mt-8 mb-8" v-if="edit">
                <v-btn color="success" icon   onclick="document.getElementById('file').click();">
                  <v-icon medium>mdi-plus-circle</v-icon>
                </v-btn>
                <input      type="file"
                            id="file"
                            style="display:none;"
                            @change="addImage"
                        />
                <v-btn color="error" icon @click="deleteImage">
                    <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
            </div>
        </div>
        <v-slide-group
            class="image-slider"
            center-active
            show-arrows
            color="purple"
        >
            <v-slide-item
                v-for="(n, k) in product.productImages"
                :key="k"
                class="image-slider__img"
            >
                <v-img
                    contain
                    :src="n.image"
                    class="ma-2"
                    @click="() => changePrimaryImg(k)"
                />
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { Product } from '@/requests/products/Product';
import Component from 'vue-class-component';

@Component({})
export default class ProductImages extends Vue {
    @Prop() product!: Product;
    @Prop() edit? :boolean;
    private imageData :  string | null ='';

    indexToShow = 0;

    get image() {
        try {
            return this.product.productImages![this.indexToShow].image;
        } catch (e) {
            return '';
        }
    }

    public changePrimaryImg(source: number) {
        this.indexToShow = source;
    }

    public deleteImage(){
        this.product.productImages.splice(this.indexToShow,1);
    }

    private addImage(e: Event) {
              
    }
    
}
</script>

<style></style>
