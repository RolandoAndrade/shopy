<template>
    <div class="card-product">
        <router-link :to="{name: 'ProductView', path: 'products',params:{id: product.id}}" class="none">
            <v-container class="img-container">
                <v-avatar tile height="150px" width="150px" class="ma-n8">
                    <v-img :src="image" />
                </v-avatar>

                <div class="cart">
                    <Icon
                            :size="'icon-medium'"
                            :icon="'icon-add_shopping_cart'"
                            :color="'white-i'"
                    />
                </div>
            </v-container>
            <div class="card-product__title">
                <div class="card-product__title-text">
                    {{product.name}}
                </div>
            </div>
            <div class="card-product__price">$ {{product.price}}</div>
            <div class="card-product__description">{{product.description}}</div>
        </router-link>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Product} from "@/requests/products/Product";
    import {Prop} from "vue-property-decorator";
    import Icon from "../typography/Icon.vue";

    @Component({
        components: {Icon}
    })
    export default class ProductCard extends Vue{
        @Prop({type: Object, required: true})
        product!: Product;


    @Prop({type: Product, required: true})
    product!: Product;
    @Prop() into! : boolean;
    private quantity : number= 1;
    get image():string
    {
        try {
            return this.product.productImages![0].image||"";
        }
        catch (e) {
            return "";
        }
    }
}
</script>

<style scoped>
</style>