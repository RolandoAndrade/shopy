<template>
    <div class="product-detail flex column">
                <div class="product-detail__title">{{product.title}}</div>
                <div class="product-detail__author">by {{product.author}}</div>
                <div class="product-detail__price">$ {{product.price}}</div>
                <div class="product-detail__condition">{{product.condition}}</div>
                <div class="product-detail__rating">
                    <Icon v-for="n in product.rating" :key="n+1" :icon="'icon-star-full'" :size="'icon-medium'" :color="'orange-i'"/>
                    <Icon v-for="n in (5-product.rating)" :key="n+5" :icon="'icon-star-empty'" :size="'icon-medium'" :color="'orange-i'"/>
                </div>
                <div class="product-detail__description">{{product.description}}</div>
                <ButtonPrimary v-on:click.native="setDialog()">
                    Add to cart
                </ButtonPrimary>
                <Popup :dialog="dialog" :response="response" :message="messageDialog"/>
                
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import Icon from '@/components/typography/Icon.vue'
import Popup from '@/components/generic/Popup.vue';
import {ProductInterface} from "@/interfaces/product.interface";

@Component({
    components:{
        ButtonPrimary,
        Icon,
        Popup
    }
})
export default class ProductDetail extends Vue {

    @Prop() product! : ProductInterface;
    private dialog: boolean =false;
    private response: boolean = true;
    private messageDialog?: string;

    private setDialog(){
        this.dialog = true;
        if (this.response === true){
                this.messageDialog='Se ha añadido al carrito correctamente!'
        }else{
              this.messageDialog='El producto no se encuentra disponible!'
        }
    }
}
</script>

<style>

</style>