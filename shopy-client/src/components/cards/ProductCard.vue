<template>
    <div class="card-product">
        <router-link :to="{name: 'ProductView', path: 'products',params:{id: product.id}}" class="none">
            <div class="img-container">
                <v-img class="card-image" :src="image" />
                <div class="cart">
                    <Icon
                            :size="'icon-medium'"
                            :icon="'icon-add_shopping_cart'"
                            :color="'white-i'"
                    />
                </div>
            </div>
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
        @Prop({type: Product, required: true})
        product!: Product;

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