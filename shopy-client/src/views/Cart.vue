<template>
    <div>
        <v-row class="space-around to-column mt-10">
            <Title size="title-secondary-big">{{this.$language.get('cart.title')}}</Title>        
            <div class="column" style="width:max-content;">
                <Icon
                icon="icon-cart"
                size="icon-big"
                color="orange-i"
                style="width:100px;"
            />
                <div class="title-terciary ">{{this.$language.get('cart.total')}}: ${{ totalPrice }} </div>
            </div>
        </v-row>
        <div class="divider" style="height:1px; width:70%"></div>
        <div v-if="this.myCart && this.myCart.length">
            <div class="mt-10 mb-10">
                <v-slide-group
                    class="image-slider text-center justify-center"
                    center-active
                    show-arrows
                    color="purple"
                >
                    <ProductCard
                        ref="selectedItems"
                        v-for="(n,k) in this.myCart"
                        :key="k"
                        :product.sync="n.product"
                        @selectedCards="selectCard"
                        :condition="'cart'"
                        :cart.sync="n"
                    />
                </v-slide-group>
            </div>
            <div
                class="flex to-column mb-10"
                style="width:min-content;margin:0 auto;"
            >
                <ButtonSecondary class="flex mr-8" @click.native="payAll"
                    >{{this.$language.get('cart.btn-buy-all')}}</ButtonSecondary
                >
                <ButtonSecondary class="flex" v-if="selected.length > 0" @click.native="paySelected">
                    {{this.$language.get('cart.buy')}} {{ selected.length }} {{this.$language.get('cart.items')}}</ButtonSecondary
                >
            </div>
        </div>
        <div v-else class="mt-10 mb-10">
            <Title size="title-secondary">Your cart is empty</Title>
        </div>
        <BillPopup :carts="bill" ref="bill"></BillPopup>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Icon from '@/components/typography/Icon.vue';
import Title from '@/components/typography/Title.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import { ProductInterface } from '../interfaces/product.interface';
import Vue from 'vue';
import {carts, user} from "@/store/namespaces";
import {USER_GET_USER} from "@/store/users/getters/user.getters";
import {User} from "@/requests/users/User";
import {CREATE_CART, FETCH_CART} from "@/store/carts/actions/carts.actions";
import {GET_CART} from "@/store/carts/getters/carts.getters";
import {Cart} from "@/requests/cart/Cart";
import BillPopup from "@/components/generic/popups/BillPopup.vue";

@Component({
    components: {
        BillPopup,
        Icon,
        Title,
        ProductCard,
        ButtonSecondary
    }
})
export default class CartView extends Vue {
    private bill: Array<Cart> = [];
    private selected: Array<Cart> = [];
    private items: ProductInterface[] = [];
    $refs!: {
        selectedItems: any;
        bill: any;
    };


    public selectCard(cart: Cart) {
        const index = this.selectedItems.findIndex((i)=>i.id === cart.id)
        if (index === -1) {
            this.selected.push(cart);
        }
        else {
            this.selected.splice(index, 1);
        }
    }

    get selectedItems(): Cart[]
    {
        return this.selected;
    }

    get totalPrice(): number
    {
        let sum = 0;
        this.selectedItems.forEach((i)=>{
            sum += i!.quantity! * (i.product!.price! - (i.product!.discount || 0));
        });
        return sum;
    }

    async mounted()
    {
        await this.fetchCart(this.user);
    }

    public payAll()
    {
        this.bill = this.myCart;
        this.$refs.bill.openModal();
    }

    public paySelected()
    {
        this.bill = this.selected;
        this.$refs.bill.openModal();
    }

    @user.Getter(USER_GET_USER) user !: User;
    @carts.Action(FETCH_CART) fetchCart !: Function;
    @carts.Getter(GET_CART) myCart !: Cart[];
}
</script>

<style></style>
