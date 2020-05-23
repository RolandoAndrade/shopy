<template>
    <v-card class="card-product" :ripple="false" @click="getDetail()">
        <div class="img-container">
            <!-- <v-avatar tile height="150px" width="150px" class="ma-n8">
                    <v-img :src="image" />
            </v-avatar>-->
            <img :src="image" class="card-image" />
            <div class="card-side bg-secondary" v-if="condition === 'catalog'" @click="addToCart()">
                <Icon :size="'icon-medium'" :icon="'icon-add_shopping_cart'" :color="'white-i'" />
            </div>
        </div>
        <div class="card-product__title">
            <div class="card-product__title-text" style="border:none;">{{ product.name }}</div>
        </div>
        <div class="card-product__price">$ {{ product.price }}</div>
        <div
            class="card-product__description"
            v-if="condition === 'catalog'"
        >{{ product.description }}</div>
        <div v-if="condition === 'cart'">
            <div class="flex">
                <v-btn color="orange" icon v-on:click="decrementQuantity()">
                    <v-icon small>mdi-menu-left</v-icon>
                </v-btn>
                <div class="title-terciary">{{ quantity }}</div>
                <v-btn color="orange" icon v-on:click="incrementQuantity()">
                    <v-icon small>mdi-menu-right</v-icon>
                </v-btn>
            </div>
            <div class="space-between mt-2">
                <v-btn color="error" icon @click="deleteProduct()">
                    <v-icon small v-if="true">mdi-delete-circle-outline</v-icon>
                </v-btn>
                <v-btn color="success" icon @click="selectProduct()">
                    <v-icon small v-if="selected === false">mdi-check-underline-circle-outline</v-icon>
                    <v-icon small v-else>mdi-check-underline-circle</v-icon>
                </v-btn>
            </div>
        </div>
        <div v-if="condition === 'my-products'">
              <v-btn color="success" icon @click="editProduct()">
                  <v-icon large>mdi-pencil-circle</v-icon>
              </v-btn>
              <v-btn color="error" icon @click="deletePublication()">
                  <v-icon large>mdi-trash-can</v-icon>
              </v-btn>
        </div>
        <Popup ref="modalAdd" :message="this.$language.get('messages.added-to-cart')" :response="true" />
        <PopupDecition
            ref="deleteCartModal"
            :icon="true"
            @receiveResponse="receiveResponse"
            :text="this.$language.get('messages.delete-from-cart')"
        />
        <PopupDecition
            ref="deletePubModal"
            :icon="true"
            @receiveResponse="receiveResponse"
            :text="this.$language.get('messages.delete-publication')"
        />
        <EditProductPopup ref="editModal" :product="product"/>
    </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Product } from '@/requests/products/Product';
import { Prop } from 'vue-property-decorator';
import Icon from '../typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import EditProductPopup from '@/components/generic/popups/EditProductPopup.vue';
import Vue from 'vue';


@Component({
    components: { Icon, Popup, PopupDecition,EditProductPopup }
})
export default class ProductCard extends Vue {
    @Prop({ type: Product, required: true })
    product!: Product;
    @Prop()
    condition!: string;

    private flag = true;
    private quantity = 1;
    private selected = false;
    private modalEdit = false;
    $refs!: {
        modalAdd: any;
        deleteCartModal: any;
        deletePubModal:any;
        editModal:any;
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
        this.quantity++;
    }

    public decrementQuantity() {
        this.flag = false;
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    public selectProduct() {
        this.flag = false;
        this.selected = !this.selected;
        this.$emit('selectedCards', this.product.id);
    }

    public deleteProduct() {
        this.flag = false;
        this.$refs.deleteCartModal.openModal();
    }

    public deletePublication(){
         this.flag = false;
        this.$refs.deletePubModal.openModal();
    }

    public editProduct(){
        console.log('editandodoooooo')
         this.flag = false;
         this.$refs.editModal.openModal();
       // this.modalEdit=true;
    }

    public addToCart() {
        this.flag = false;
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


}
</script>

<style scoped></style>
