<template>
    <div>
        <v-card
            class="card-product"
            :ripple="false"
            @click="getDetail()"
            v-if="showCard"
        >
            <div class="img-container">
                <img :src="image" class="card-image" />
                <div
                    class="card-side bg-secondary"
                    v-if="condition === 'catalog' && showCartIcon"
                    @click="addToCart()"
                >
                    <Icon
                        :size="'icon-medium'"
                        :icon="'icon-add_shopping_cart'"
                        :color="'white-i'"
                        class="mr-4"
                    />
                </div>
            </div>
            <div class="card-product__title">
                <div class="card-product__title-text" style="border:none;">
                    {{ product.name }}
                </div>
            </div>
            <div class="card-product__price">$ {{ product.price }}</div>
            <div
                class="card-product__description"
                v-if="condition === 'catalog'"
            >
                {{ product.description }}
            </div>
            <div v-if="condition === 'cart'">
                <div class="flex">
                    <v-btn color="orange" icon v-on:click="decrementQuantity()">
                        <v-icon medium>mdi-menu-left</v-icon>
                    </v-btn>
                    <div class="title-terciary">{{ mCart.quantity }}</div>
                    <v-btn color="orange" icon v-on:click="incrementQuantity()">
                        <v-icon medium>mdi-menu-right</v-icon>
                    </v-btn>
                </div>
                <div class="space-between mt-2">
                    <v-btn color="error" icon @click="deleteProduct()">
                        <v-icon medium v-if="true"
                            >mdi-delete-circle-outline</v-icon
                        >
                    </v-btn>
                    <v-btn color="success" icon @click="selectProduct()">
                        <v-icon medium v-if="selected === false"
                            >mdi-check-underline-circle-outline</v-icon
                        >
                        <v-icon medium v-else
                            >mdi-check-underline-circle</v-icon
                        >
                    </v-btn>
                </div>
            </div>
            <div v-if="condition === 'my-products'">
                <v-btn color="success" icon @click="editProduct(product.id)">
                    <v-icon medium>mdi-pencil-circle</v-icon>
                </v-btn>
                <v-btn color="error" icon @click="deletePublication()">
                    <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
            </div>
            <Popup
                ref="modalAdd"
                :message="this.$language.get('messages.added-to-cart')"
                :response="true"
            />
            <PopupDecition
                ref="deleteCartModal"
                :is-delete="true"
                @receiveResponse="receiveResponseDelete"
                :text="this.$language.get('messages.delete-from-cart')"
            />
            <PopupDecition
                ref="deletePubModal"
                :icon="true"
                @receiveResponse="receiveResponseDeletePublication"
                :text="this.$language.get('messages.delete-publication')"
            />
            <EditProductPopup ref="editModal" :product="product" />
        </v-card>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Product } from '@/requests/products/Product';
import { Prop, PropSync } from 'vue-property-decorator';
import Icon from '../typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import EditProductPopup from '@/components/generic/popups/EditProductPopup.vue';
import { productDetail } from '../../store/namespaces';
import {
    PRODUCT_DETAIL_UPDATE_PRODUCT,
    PRODUCTS_DETAIL_FETCH_PRODUCT,
    PRODUCT_DETAIL_DELETE_PRODUCT
} from '../../store/products/actions/products.detail.actions';

import Vue from 'vue';
import { carts, user } from '@/store/namespaces';
import {
    CREATE_CART,
    DELETE_CART,
    UPDATE_CART
} from '@/store/carts/actions/carts.actions';
import {IS_LOGGED, USER_GET_USER} from '@/store/users/getters/user.getters';
import { User } from '@/requests/users/User';
import { Cart } from '@/requests/cart/Cart';
import { GET_CART } from '@/store/carts/getters/carts.getters';
import { isInCart, isPoster } from '@/utils/global-functions';

@Component({
    components: { Icon, Popup, PopupDecition, EditProductPopup }
})
export default class ProductCard extends Vue {
    @Prop({ type: Object, required: true })
    product!: Product;
    @Prop()
    condition!: string;
    @PropSync('cart', { required: false, type: Object })
    mCart!: Cart;

    showCard = true;
    isShowCartButton = true;

    private flag = true;
    private selected = false;
    private modalEdit = false;

    $refs!: {
        modalAdd: any;
        deleteCartModal: any;
        deletePubModal: any;
        editModal: any;
    };

    get image(): string {
        try {
            return this.product.productImages![0].image || '';
        } catch (e) {
            return '';
        }
    }

    public incrementQuantity() {
        this.flag = false;
        if (
            this.mCart.quantity != undefined &&
            this.mCart.product &&
            this.mCart.product.stock!.quantity &&
            this.mCart.product.stock!.minimumQuantity
        ) {
            if (
                this.mCart.product.stock!.quantity >
                this.mCart.product.stock!.minimumQuantity
            ) {
                this.mCart.product.stock!.quantity--;
                this.mCart.quantity++;
                this.updateCart(this.mCart);
            }
        }
    }

    public decrementQuantity() {
        this.flag = false;
        if (
            this.mCart.quantity &&
            this.mCart.quantity > 1 &&
            this.mCart.product
        ) {
            if (
                this.mCart.product.stock!.quantity &&
                this.mCart.product.stock!.minimumQuantity
            ) {
                if (this.mCart.product.stock!.quantity) {
                    this.mCart.product.stock!.quantity++;
                    this.mCart.quantity--;
                    this.updateCart(this.mCart);
                }
            }
        }
    }

    public selectProduct() {
        this.flag = false;
        this.selected = !this.selected;
        this.$emit('selectedCards', this.mCart);
    }

    public deleteProduct() {
        this.flag = false;
        this.$refs.deleteCartModal.openModal();
    }

    public deletePublication() {
        this.flag = false;
        this.$refs.deletePubModal.openModal();
    }

    public async editProduct(id: number) {
        this.flag = false;
        await this.fetchProduct(id);
        this.$refs.editModal.openModal();
        // this.modalEdit=true;
    }

    public async addToCart() {
        this.flag = false;
        this.isShowCartButton = false;
        await this.addProductToCart({ product: this.product, user: this.user });
        this.$refs.modalAdd.openModal();
    }

    public getDetail() {
        if (this.flag) {
            this.$router.push({
                name: 'ProductDetailView',
                params: { id: '' + this.product.id }
            });
        }
        this.flag = true;
    }

    public receiveResponseDelete(response: boolean) {
        if (response) {
            if (this.selected) {
                this.selected = !this.selected;
                this.$emit('selectedCards', this.mCart);
            }
            this.showCard = false;
            this.deleteCart(this.mCart);
        }
    }

    public async receiveResponseDeletePublication(response: boolean) {
        if (response === true) {
            const x = await this.deletePub(this.product.id);
            this.$emit('updateProducts');
        }
    }

    mounted() {}

    get showCartIcon(): boolean {
        return (
            !isInCart(this.myCart, this.product) &&
            !isPoster(this.product, this.user) &&
            this.isShowCartButton &&
                    this.isLogged
        );
    }

    @carts.Getter(GET_CART) myCart!: Cart[];
    @carts.Action(CREATE_CART) addProductToCart!: Function;
    @carts.Action(UPDATE_CART) updateCart!: Function;
    @user.Getter(USER_GET_USER) user!: User;
    @carts.Action(DELETE_CART) deleteCart!: Function;
    @productDetail.Action('PRODUCT_DETAIL_DELETE_PRODUCT')
    deletePub!: Function;
    @productDetail.Action('PRODUCTS_DETAIL_FETCH_PRODUCT')
    fetchProduct!: Function;
    @user.Getter(IS_LOGGED) isLogged !: boolean;
}
</script>

<style scoped></style>
