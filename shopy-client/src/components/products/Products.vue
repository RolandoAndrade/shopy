<template>
    <div>
        <div class="flex wrap padding-medium container-space ">
            <ProductCard
                v-for="n in visibleProducts"
                :key="n.id"
                :product="n"
                :into="false"
            />
        </div>
        <div class="text-center margin-medium">
            <v-pagination
                total-visible="10"
                v-model="currentPage"
                :length="getLength"
                circle
                color="purple"
                @input="changePage()"
                style="font-size:50px !important;"
            ></v-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '../typography/Icon.vue';
import ProductCard from '../cards/ProductCard.vue';
import { Product } from '@/requests/products/Product';

@Component({
    components: {
        Icon,
        ProductCard
    }
})
export default class Products extends Vue {
    private visibleProducts: Product[] = [];
    private currentPage = 1;
    private pageSize = 6;
    private products: Product[] = [];

    get getLength() {
        return Math.ceil(this.products.length / this.pageSize);
    }

    beforeMount() {
        window.scrollTo(0, 0);
        this.updateVisibleProducts();
    }

    private changePage(): void {
        window.scrollTo(0, 0);
        this.updateVisibleProducts();
    }

    private updateVisibleProducts() {
        this.visibleProducts = this.products.slice(
            (this.currentPage - 1) * this.pageSize,
            (this.currentPage - 1) * this.pageSize + this.pageSize
        );
    }
}
</script>

<style scoped></style>
