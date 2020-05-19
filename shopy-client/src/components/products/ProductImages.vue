<template>
  <div class="product-images flex column"> 
                <div class="product__image-container">
                    <v-img
                        class="product__image-container__img"
                        contain
                        :src="image"
                    />
                </div>
                <v-slide-group class="image-slider" center-active show-arrows  color="purple" >
                    <v-slide-item v-for="(n,k) in product.productImages" :key="k" class="image-slider__img"  >
                        <v-img contain :src="n.image" class="ma-2"  @click="()=>changePrimaryImg(n.id)" />
                    </v-slide-item>
                </v-slide-group>
            </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop } from 'vue-property-decorator';
import {Product} from "@/requests/products/Product";
import Component from "vue-class-component";

@Component({})
export default class ProductImages extends Vue {
    @Prop() product! : Product;

    indexToShow: number = 0;

    get image()
    {
        try
        {
            return this.product.productImages![0].image
        }
        catch (e)
        {
            return ""
        }
    }

    public changePrimaryImg(source : number){
        this.indexToShow = source;
    }
}
</script>

<style>

</style>