<template>
  <div class="product-images flex column"> 
                <div class="product__image-container">
                    <v-img
                        class="product__image-container__img"
                        contain
                        :src="require(`@/assets/`+product.image)"  
                    />
                </div>
                <v-slide-group class="image-slider" center-active show-arrows  color="purple" >
                    <v-slide-item v-for="n in product.images" :key="n.id" class="image-slider__img"  >
                        <v-img contain :src="require(`@/assets/`+n.name)" class="ma-2"  @click="()=>changePrimaryImg(n.name)" />
                    </v-slide-item>
                </v-slide-group>
            </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ProductInterface} from "@/interfaces/product.interface";

@Component({})
export default class ProductImages extends Vue {
    @Prop() product! : ProductInterface;

        private changePrimaryImg(source : string){
        this.product.image= source;
    }
}
</script>

<style>

</style>