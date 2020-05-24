<template>
    <div>
        <Container>
            <div class="column mt-4 mb-8" style="margin:0 auto;">
                <Title size="title-secondary-big">{{this.$language.get('my-product.title')}}</Title>
                <div class="title-center">5 {{this.$language.get('cart.items')}}</div>
            </div>
            <div class="divider" style="height:1px; width:70%"></div>
            <div class="flex wrap cover" style="width:100%;">
                <ProductCard v-for="(n, k) in this.visibleProducts" :key="k" :product="n" condition='my-products'>
                </ProductCard>
            </div>
            <div style="margin:25px auto;">
                <v-pagination
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
import { validationMixin } from 'vuelidate';
import Vue from 'vue';

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
    private myProducts: Product[] = [
        {
            id: 1,
            name: 'Banana',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 2,
            name: 'Laptop Pro Hp',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 3,
            name: 'Iphone 11 max',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 4,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 5,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 6,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 7,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 8,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 9,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        },
        {
            id: 10,
            name: 'Sacapuntas',
            price: 234,
            new:true,
            description: 'Hola que tal',
            width: 12,
            height: 43,
            productImages:[{image:'https://images-na.ssl-images-amazon.com/images/I/71erj%2BkgoSL._UL1500_.jpg'}],
            stock: 2,
            user: 'Tete'
        }
    ];

    private openDeleteModal() {
        this.$refs.decitionModal.openModal();
    }

    private receiveResponse(response: string) {
        // no, yes
    }

    private findProduct(product: number) {
        this.currentProduct = this.myProducts.find(p => p.id === product);
    }

    get getLength() {
        return Math.ceil(this.myProducts.length / this.pageSize);
    }
    beforeMount() {
        this.updateVisibleProducts();
    }
    private changePage(): void {
        this.updateVisibleProducts();
    }
    private updateVisibleProducts() {
        this.visibleProducts = this.myProducts.slice(
            (this.currentPage - 1) * this.pageSize,
            (this.currentPage - 1) * this.pageSize + this.pageSize
        );
    }

   


}
</script>

<style scoped>
.form__input {
    font-size: 16px !important;
}
</style>
