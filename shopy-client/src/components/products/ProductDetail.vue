<template>
    <v-container class="product-detail flex column">
        <div class="product-detail__title">{{ product.name }}</div>
        <div class="product-detail__author">{{this.$language.get('generic.by')}} {{ product.user.username }}</div>
        <div class="product-detail__price">$ {{ product.price }}</div>
        <div class="product-detail__condition">
            {{ product.new ? 'New' : 'Used' }}
        </div>
        <div class="product-detail__stock mb-4">
            {{ product.stock.quantity }} {{this.$language.get('generic.in-stock')}}
        </div>
        <div class="product-detail__stock mb-4" v-if="onlyDetails">
            {{ product.stock.minimumQuantity }} min quantity on stock
        </div>
        <div class="product-detail__stock mb-4" v-if="onlyDetails">
            {{ product.width }} x {{ product.height }} dimentions
        </div>
        <v-row class="product-detail__rating justify-end" v-if="!onlyDetails">
            <Icon
                v-for="n in Math.round(product.score)"
                :key="n"
                :icon="'icon-star-full'"
                :size="'icon-small'"
                :color="'orange-i'"
            />
            <Icon
                v-for="n in 5 - Math.round(product.score)"
                :key="n+5"
                :icon="'icon-star-empty'"
                :size="'icon-small'"
                :color="'orange-i'"
            />
        </v-row>
        <div class="product-detail__description">{{ product.description }}</div>
        <ButtonPrimary @click.native="setDialog" v-if="!onlyDetails && showButton">
            {{this.$language.get('generic.add-to-cart')}}
        </ButtonPrimary>
        <div class="product-detail__comments mt-4" v-if="!onlyDetails">
            <v-btn color="purple" icon v-on:click="commentDialog = true">
                <v-icon large> mdi-chat-processing</v-icon>
            </v-btn>
            <div class="title-center ml-2" style="color:purple;">
                            {{this.$language.get('generic.see-comments')}}
            </div>
        </div>

        <v-dialog v-model="commentDialog" scrollable max-width="600px">
            <v-card>
                <v-card-title>{{this.$language.get('generic.Comments')}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;" v-if="comments.length > 0">
                    <div
                        class="card-comment"
                        v-for="(i, ind) in comments"
                        :key="ind"
                    >
                        <Icon
                            size="icon-medium"
                            icon="icon-bubbles2"
                            color="orange-i"
                            style="margin-right:30px;"
                        />
                        <div class="card-comment__text">
                            {{ i }}
                        </div>
                    </div>
                </v-card-text>
                <v-card-text v-else class="flex">
                    <div class="title-terciary mt-6">
                        {{this.$language.get('generic.no-comments')}}
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="purple" text @click="commentDialog = false"
                        >{{this.$language.get('generic.close')}}</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Popup ref="modalAdd" :message="this.$language.get('messages.added-to-cart')" :response="true" />
    </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import Icon from '@/components/typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';
import { Product } from '@/requests/products/Product';
import Vue from 'vue';
import {carts, user} from "@/store/namespaces";
import {GET_CART} from "@/store/carts/getters/carts.getters";
import {Cart} from "@/requests/cart/Cart";
import {USER_GET_USER} from "@/store/users/getters/user.getters";
import {User} from "@/requests/users/User";
import {isInCart, isPoster} from "@/utils/global-functions";
import {CREATE_CART} from "@/store/carts/actions/carts.actions";

@Component({
    components: {
        ButtonPrimary,
        Icon,
        Popup
    }
})
export default class ProductDetail extends Vue {
    @Prop() product!: Product;
    @Prop({required: false, default: false})
    onlyDetails!: boolean;
    $refs!: {
        modalAdd: any
    };

    showAddToCartButton: boolean = true;
   
    private messageDialog: string="";
    private commentDialog = false;
    private comments: Array<string> = [
        'Excelente producto!Me encanto, quede fascinada...',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure rem accusantium obcaecati ipsa nemo vitae aut, ab itaque repellendus nam dolores sapiente iusto minima velit, possimus provident ducimus debitis similique',
        'El producto es una maravilla, como los creadores de este sitio'
    ];


    public async setDialog() {
        this.showAddToCartButton = false;
        await this.addProductToCart({product: this.product, user: this.user});
        this.$refs.modalAdd.openModal();
    }

    get showButton(): boolean
    {
        return !isInCart(this.myCart, this.product) && !isPoster(this.product, this.user) && this.showAddToCartButton;
    }

    @carts.Getter(GET_CART) myCart !: Cart[];
    @carts.Action(CREATE_CART) addProductToCart !: Function;
    @user.Getter(USER_GET_USER) user !: User;
}
</script>

<style></style>
