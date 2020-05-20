<template>

    <div class="flex" >

        <div class="product-detail-container to-column space-between" style="margin:40px auto;width:100%">
            <ProductImages :product="product" class="mx-12"/>
            <ProductDetail :product="product" />
        </div>
       
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProductDetail from '../components/products/ProductDetail.vue';
import ProductImages from '../components/products/ProductImages.vue';
import {productDetail} from "@/store/namespaces";
import {PRODUCTS_DETAIL_FETCH_PRODUCT} from "@/store/products/actions/products.detail.actions";
import {GET_PRODUCT_DATA} from "@/store/products/getters/products.detail.getters";
import {Product} from "@/requests/products/Product";

@Component({
    components:{
        ProductDetail,
        ProductImages
       
    }
})
export default class ProductDetailView extends Vue {
    public product: ProductInterface = {
        id: 0.1,
        title: 'Mac Book Pro Air',
        author:'Tete',
        price: 999,
        condition: 'Used',
        width:123,
        height:123,
        description:
            'Lorem ipsum dolor. this is the description of the product',
        image: 'prueba.jpg',
        images: [{id:1,name:'mac1.jpg'},{id:2,name:'mac2.jpg'},{id:3,name:'prueba.jpg'},{id:4,name:'mac3.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'}],
        rating:3,
        stock:5
    };
   


    async mounted()
    {
        const id = this.$route.params.id;
        await this.fetchProduct(id);
    };


    @productDetail.Action(PRODUCTS_DETAIL_FETCH_PRODUCT) fetchProduct!: Function;
    @productDetail.Getter(GET_PRODUCT_DATA) product!: Product;

}
</script>

<style lang="scss">

.v-slide-item--active{
     filter: brightness(50%);
     transform: scale(1.25);
}



</style>