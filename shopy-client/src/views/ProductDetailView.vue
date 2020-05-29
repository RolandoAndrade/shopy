<template>
    <div class="product-detail-container">
        <GoBackButton />
        <div class=" to-column space-between" style="margin:5px auto;width:90%">
            <ProductImages :product="product" class="mx-12" />
            <ProductDetail :product="product" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductDetail from '../components/products/ProductDetail.vue';
import ProductImages from '../components/products/ProductImages.vue';
import GoBackButton from '@/components/generic/GoBackButton.vue';
import { productDetail } from '@/store/namespaces';
import { PRODUCTS_DETAIL_FETCH_PRODUCT } from '@/store/products/actions/products.detail.actions';
import { GET_PRODUCT_DATA } from '@/store/products/getters/products.detail.getters';
import { Product } from '@/requests/products/Product';
@Component({
    components: {
        ProductDetail,
        ProductImages,
        GoBackButton
    }
})
export default class ProductDetailView extends Vue {
    async mounted() {
        const id = this.$route.params.id;
        await this.fetchProduct(id);
    }

    @productDetail.Action(PRODUCTS_DETAIL_FETCH_PRODUCT)
    fetchProduct!: Function;
    @productDetail.Getter(GET_PRODUCT_DATA) product!: Product;
}
</script>

<style lang="scss">
.v-slide-item--active {
    filter: brightness(50%);
    transform: scale(1.25);
}
</style>
