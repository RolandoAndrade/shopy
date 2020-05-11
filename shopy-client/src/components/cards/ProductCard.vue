<template>
    <div>
        <div class="flex wrap padding-medium container-space">
           
                <div class="card-product" v-for="n in visibleProducts" :key="n.id">
                <router-link :to="{name: 'ProductView', path: 'products',params:{id: n.id}}" class="none">   
                        <div class="img-container">
                            <img class="card-image" src="../../assets/prueba.jpg" />
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
                                {{n.title}}  
                            </div>  
                        </div>
                        <div class="card-product__price">$ {{n.price}}</div>
                        <div class="card-product__description">{{n.description}}</div>
                </router-link>  
            </div>
            
        </div>
        <div class="text-center margin-medium">
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
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '../typography/Icon.vue';
import {Product} from '../../interfaces/product.interface';

@Component({
    components: {
        Icon
    }
})
export default class ProductCard extends Vue {
    private visibleProducts: Product[] = [];
    private currentPage: number = 1;
    private pageSize: number = 6;
    private products: Product[] = [
        {
            id: 1,
            title: 'iPad Pro max asjdnajbfa jhsd qaldnajbsd ',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 2,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 3,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 4,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 5,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 6,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 7,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 8,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 9,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 10,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 11,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        },
        {
            id: 12,
            title: 'iPad Pro max',
            price: 200,
            condition:'Used',
            description: 'lorem ipsum d',
            image: 'prueba.jpeg',
            author:'Tete'
        }
    ];

    get getLength() {
        return Math.ceil(this.products.length / this.pageSize);
    }

    beforeMount() {
        this.updateVisibleProducts();
    }

    private changePage(): void {
        window.scrollTo(0,0);
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

<style scoped>
    .none{
        text-decoration:none;
        color:black;
    }
</style>