<template>
    <div class="card-product">
                    <router-link :to="{name: 'ProductView', path: 'products',params:{id: product.id}}" class="none">
                            <div class="img-container">
                                <img class="card-image" :src="image" />
                                <div class="card-side bg-secondary" v-if="!into">
                                    <Icon
                                        :size="'icon-medium'"
                                        :icon="'icon-add_shopping_cart'"
                                        :color="'white-i'"
                                    />
                                </div>
                                 <div class="card-side bg-error" v-if="into">
                                    <Icon
                                        :size="'icon-medium'"
                                        :icon="'icon-x-circle'"
                                        :color="'white-i'"
                                    />
                                </div>
                            </div>
                            <div class="card-product__title">
                                <div class="card-product__title-text">
                                    {{product.title}}
                                </div>
                            </div>
                     </router-link>
                            <div class="card-product__price">$ {{product.price}}</div>
                            <div class="card-product__description" v-if="!into">{{product.description}}</div>
                            <div v-else class="flex">
                                    <v-btn color="orange" icon  v-on:click="if (quantity>1) ! quantity--">
                                        <v-icon small>mdi-menu-left</v-icon>
                                    </v-btn>
                                        <div class="title-terciary">{{quantity}}</div>
                                   <v-btn color="orange" icon  v-on:click="quantity++">
                                        <v-icon small>mdi-menu-right</v-icon>
                                    </v-btn>
                            </div>

    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Product} from "@/requests/products/Product";
    import {Prop} from "vue-property-decorator";
    import Icon from "../typography/Icon.vue";

@Component({
    components:{
        Icon
    }
})
export default class ProductCard extends Vue {

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