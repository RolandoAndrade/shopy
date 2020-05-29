<template>
    <div>
        <Container>
            <div class="column mt-4 mb-8" style="margin:0 auto;">
                <Title size="title-secondary-big">{{
                    this.$language.get('my-product.title')
                }}</Title>
                <div class="title-center">
                    {{ products.length }} {{ this.$language.get('cart.items') }}
                </div>
            </div>
            <div class="divider" style="height:1px; width:70%"></div>
            <div class="flex wrap cover" style="width:100%;" v-if="products">
                <ProductCard
                    v-for="(n, k) in this.products"
                    :key="k"
                    :product="n"
                    condition="my-products"
                    @updateProducts="updateProducts"
                >
                </ProductCard>
            </div>
            <v-content v-else>
                <Title size="title-secondary"
                    >There are no publications yet</Title
                >
            </v-content>
            <div style="margin:25px auto;">
                <v-pagination
                    v-if="products"
                    total-visible="10"
                    v-model="currentPage"
                    :length="getLength"
                    circle
                    color="purple"
                    @input="changePage()"
                    class="xyz"
                ></v-pagination>
            </div>
        </Container>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import { Product } from '../requests/products/Product';
import ProductCard from '@/components/cards/ProductCard.vue';
import Popup from '@/components/generic/Popup.vue';
import Icon from '@/components/typography/Icon.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import Container from '@/components/layout/Container.vue';
import { maxLength, minValue, required } from 'vuelidate/lib/validators';
import { USER_FETCH_PRODUCTS } from '../store/users/actions/user.products.actions';
import { user } from '../store/namespaces';
import { validationMixin } from 'vuelidate';
import Vue from 'vue';
import { GET_PRODUCTS_DATA } from '@/store/users/getters/user.getters';

@Component({
    components: {
        Title,
        ProductCard,
        Popup,
        PopupDecition,
        Icon,
        Container
    },
    mixins: [validationMixin],
    validations: {
        currentProduct: {
            price: { minValue: minValue(1) },
            width: { minValue: minValue(1) },
            height: { minValue: minValue(1) },
            stock: { minValue: minValue(1) },
            title: { required, maxLength: maxLength(25) },
            description: { required }
        }
    }
})
export default class MyProducts extends Vue {
    private visibleProducts: Product[] = [];
    private currentPage = 1;
    private pageSize = 6;

    $refs!: {
        decitionModal: any;
    };
    private currentProduct?: Product;

    private openDeleteModal() {
        this.$refs.decitionModal.openModal();
    }

    private receiveResponse(response: string) {
        // no, yes
    }

    private findProduct(product: number) {
        this.currentProduct = this.products!.find(p => p.id === product);
    }

    get getLength() {
        return Math.ceil(this.products!.length / this.pageSize);
    }
    beforeMount() {
        this.updateVisibleProducts();
    }
    private changePage(): void {
        this.updateVisibleProducts();
    }
    private updateVisibleProducts() {
        this.visibleProducts = this.products!.slice(
            (this.currentPage - 1) * this.pageSize,
            (this.currentPage - 1) * this.pageSize + this.pageSize
        );
    }

    mounted() {
        this.updateProducts();
    }

    public async updateProducts() {
        await this.fetchProducts();
    }

    @user.Getter(GET_PRODUCTS_DATA) products?: Product[];
    @user.Action(USER_FETCH_PRODUCTS)
    fetchProducts!: Function;
}
</script>

<style scoped>
.form__input {
    font-size: 16px !important;
}
</style>
