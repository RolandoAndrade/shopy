<template>
    <v-container class="product-detail pa-0 my-4">
        <v-col>
            <div class="product-detail__title">{{product.name}}</div>
            <div class="product-detail__author">by {{product.user.username}}</div>
            <div class="product-detail__price">$ {{product.price}}</div>
            <div class="product-detail__condition">{{product.new?"New":"Used"}}</div>
            <div class="product-detail__stock mb-4">{{product.stock.quantity}} left in stock</div>
            <div class="product-detail__rating">
                <Icon v-for="n in Math.round(product.score)" :key="n" :icon="'icon-star-full'" :size="'icon-medium'" :color="'orange-i'"/>
                <Icon v-for="n in (5-Math.round(product.score))" :key="n" :icon="'icon-star-empty'" :size="'icon-medium'" :color="'orange-i'"/>
            </div>
            <div class="product-detail__description">{{product.description}}</div>
            <ButtonPrimary v-on:click.native="setDialog()">
                Add to cart
            </ButtonPrimary>
            <Popup :dialog="dialog" :response="response" :message="messageDialog"/>
        </v-col>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop} from 'vue-property-decorator';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import Icon from '@/components/typography/Icon.vue'
import Popup from '@/components/generic/Popup.vue';
import {Product} from "@/requests/products/Product";

@Component({
    components:{
        ButtonPrimary,
        Icon,
        Popup
    }
})
export default class ProductDetail extends Vue {

    @Prop() product! : Product;
    private dialog: boolean =false;
    private response: boolean = true;
    private messageDialog: string = "";

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