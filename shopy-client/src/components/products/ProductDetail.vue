<template>
    <v-container class="product-detail flex column">
        <div class="product-detail__title">{{ product.name }}</div>
        <div class="product-detail__author">by {{ product.user.username }}</div>
        <div class="product-detail__price">$ {{ product.price }}</div>
        <div class="product-detail__condition">
            {{ product.new ? 'New' : 'Used' }}
        </div>
        <div class="product-detail__stock mb-4">
            {{ product.stock.quantity }} left in stock
        </div>
        <v-row class="product-detail__rating justify-end">
            <Icon
                v-for="n in Math.round(product.score)"
                :key="n"
                :icon="'icon-star-full'"
                :size="'icon-medium'"
                :color="'orange-i'"
            />
            <Icon
                v-for="n in 5 - Math.round(product.score)"
                :key="n"
                :icon="'icon-star-empty'"
                :size="'icon-medium'"
                :color="'orange-i'"
            />
        </v-row>
        <div class="product-detail__description">{{ product.description }}</div>
        <ButtonPrimary v-on:click.native="setDialog()">
            Add to cart
        </ButtonPrimary>
        <div class="product-detail__comments mt-4">
            <v-btn color="purple" icon v-on:click="commentDialog = true">
                <v-icon large> mdi-chat-processing</v-icon>
            </v-btn>
            <div class="title-center" style="color:purple;">SEE COMMENTS</div>
        </div>
        <Popup :dialog="dialog" :response="response" :message="messageDialog" />

        <v-dialog v-model="commentDialog" scrollable max-width="600px">
            <v-card>
                <v-card-title>Comments</v-card-title>
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
                        This publication has no comments
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="purple" text @click="commentDialog = false"
                        >Close</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import Icon from '@/components/typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';
import { Product } from '@/requests/products/Product';

@Component({
    components: {
        ButtonPrimary,
        Icon,
        Popup
    }
})
export default class ProductDetail extends Vue {
    @Prop() product!: Product;
    private dialog = false;
    private response = true;

    private messageDialog?: string;
    private commentDialog = false;
    private comments: Array<string> = [
        'Excelente producto!Me encanto, quede fascinada...',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure rem accusantium obcaecati ipsa nemo vitae aut, ab itaque repellendus nam dolores sapiente iusto minima velit, possimus provident ducimus debitis similique',
        'El producto es una maravilla, como los creadores de este sitio'
    ];

    private setDialog() {
        this.dialog = true;
        if (this.response === true) {
            this.messageDialog = 'Se ha añadido al carrito correctamente!';
        } else {
            this.messageDialog = 'El producto no se encuentra disponible!';
        }
    }
}
</script>

<style></style>
