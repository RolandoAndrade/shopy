<template>
    <div>
        <div class="inline align-center ma-6 to-column">
            <Icon
                icon="icon-cart"
                size="icon-gigant"
                class="mr-6"
                color="orange-i"
            />
            <div class="column ">
                <Title size="title-primary">My Cart</Title>
                <div class="title-terciary mt-4">Total: {{ totalPrice }} $</div>
            </div>
        </div>
        <div class="divider" style="height:1px; width:70%"></div>
        <div v-if="items">
            <div class="mt-10 mb-10">
                <v-slide-group
                    class="image-slider"
                    center-active
                    show-arrows
                    color="purple"
                >
                    <ProductCard
                        ref="selectedItems"
                        v-for="n in items"
                        :key="n.id"
                        :product="n"
                        @selectedCards="selectedCards"
                    />
                </v-slide-group>
            </div>
            <div
                class="flex to-column mb-10"
                style="width:min-content;margin:0 auto;"
            >
                <ButtonPrimary class="flex mr-8"
                    >Buy all the products!</ButtonPrimary
                >
                <ButtonPrimary class="flex" v-if="selected.length > 0">
                    Buy {{ selected.length }} items</ButtonPrimary
                >
            </div>
        </div>
        <div v-else class="mt-10 mb-10">
            <Title size="title-secondary">Your cart is empty</Title>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '@/components/typography/Icon.vue';
import Title from '@/components/typography/Title.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
    components: {
        Icon,
        Title,
        ProductCard,
        ButtonPrimary
    }
})
export default class Cart extends Vue {
    private selected: Array<number> = [];
    private totalPrice = 1202;
    private items: ProductInterface[] = [
        {
            id: 1,
            title: 'Banana',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 2,
            title: 'Laptop Pro Hp',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 3,
            title: 'Iphone 11 max',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 4,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 5,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 6,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 7,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 8,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 9,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 10,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        }
    ];
    $refs!: {
        selectedItems: any;
    };

    private selectedCards(id: number) {
        console.log('AQUI');
        console.log(id);
        this.selectCard(id);
    }

    private selectCard(productId: number) {
        const selected = this.selected.find(f => f === productId);
        if (selected === undefined) this.selected.push(productId);
        else {
            const indx = this.selected.indexOf(productId);
            this.selected.splice(indx, 1);
        }
    }
}
</script>

<style></style>
