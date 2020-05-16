<template>
    <div class="flex" >
        <div class="product-detail-container to-column  space-between">
            <ProductImages :product="product"/>
            <ProductDetail :product="product" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { ProductInterface } from '@/interfaces/product.interface';
import ProductDetail from '../components/products/ProductDetail.vue';
import ProductImages from '../components/products/ProductImages.vue';

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
        description:
            'Lorem ipsum dolor. this is the description of the product',
        image: 'prueba.jpg',
        images: [{id:1,name:'mac1.jpg'},{id:2,name:'mac2.jpg'},{id:3,name:'prueba.jpg'},{id:4,name:'mac3.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'},{id:5,name:'mac4.jpg'}],
        rating:3,
        stock:5
    };


   
}
</script>

<style lang="scss">
.v-slide-item--active{
     filter: brightness(50%);
     transform: scale(1.25);
}
</style>