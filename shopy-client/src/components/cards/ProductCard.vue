<template>
 <v-card class="card-product" :to="{name: 'ProductView', path: 'products',params:{id: product.id}}">
            <div class="img-container">
               <!-- <v-avatar tile height="150px" width="150px" class="ma-n8">
                    <v-img :src="image" />
                </v-avatar>-->
                  <img :src="image" class="card-image" />
                  <div class="card-side bg-secondary" v-if="condition === 'catalog'">
                    <Icon
                            :size="'icon-medium'"
                            :icon="'icon-add_shopping_cart'"
                            :color="'white-i'"
                    />
                  </div>
                 <div class="card-side bg-error" v-if="condition === 'cart'">
                                    <Icon
                                        :size="'icon-medium'"
                                        :icon="'icon-x-circle'"
                                        :color="'white-i'"
                                    />
                </div>
            </div>
            <div class="card-product__title">
                <div class="card-product__title-text" style="border:none;">
                    {{product.name}}
                </div>
            </div>
         </router-link>
            <div class="card-product__price">$ {{product.price}}</div>
            <div class="card-product__description"  v-if="condition === 'catalog'">{{product.description}}</div>
             <div v-else-if="condition === 'cart'" class="flex">
                    <v-btn color="orange" icon  v-on:click="if (quantity>1) ! quantity--">
                        <v-icon small>mdi-menu-left</v-icon>
                    </v-btn>
                    <div class="title-terciary">{{quantity}}</div>
                    <v-btn color="orange" icon  v-on:click="quantity++">
                        <v-icon small>mdi-menu-right</v-icon>
                    </v-btn>
            </div>
            <slot/>
        
    </v-card>

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
    @Prop() condition! : string;
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
</script>

<style scoped>
</style>