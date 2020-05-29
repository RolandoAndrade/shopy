<template>
    <v-dialog v-model="modalEdit" scrollable max-width="600px" height="cover">
        <v-card>
            <Title size="title-secondary" class="ma-2">Bill</Title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row v-for="(cart, k) in carts" :key="k" class="pa-4">
                    <v-col cols="6">
                        <Title size="title-terciary text-left"><v-icon class="mx-2">mdi-cash</v-icon>   {{cart.product.name}}</Title>
                    </v-col>
                    <v-col cols="6">
                        <Title size="title-terciary text-right">{{cart.quantity}} x {{cart.product.price - (cart.product.discount || 0)}} =
                            ${{(cart.product.price - (cart.product.discount || 0)) * cart.quantity}}</Title>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-col cols="12" sm="6">
                    <Title size="title-terciary">Sub total: ${{subTotal}}</Title>
                    <Title size="title-terciary">Comission: ${{getCommission}}</Title>
                    <Title size="title-secondary">Total: ${{totalPrice}}</Title>
                </v-col>
                <v-col cols="12" sm="6" class="justify-end text-right">
                    <div class="px-6">
                        <ButtonSecondary @click.native="letsPay" :is-loading="loading">Pay now</ButtonSecondary>
                    </div>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import Title from '@/components/typography/Title.vue';
    import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
    import {Prop} from "vue-property-decorator";
    import {Cart} from "@/requests/cart/Cart";
    import {payment, user} from "@/store/namespaces";
    import {PAYMENTS_FETCH_COMMISSION, PAYMENTS_PAY} from "@/store/payments/actions/payment.actions";
    import {PAYMENT_GET_COMMISSION} from "@/store/payments/getters/payment.getters";
    import {USER_GET_USER} from "@/store/users/getters/user.getters";
    import {User} from "@/requests/users/User";
    import {CheckoutCartsInterface} from "@/interfaces/checkout-carts.interface";

    @Component({
        components:{
            Title,
            ButtonSecondary
        }
    })
    export default class BillPopup extends Vue {
        @Prop({required: true, type: Array})
        carts!: Cart[];

        modalEdit = false;
        loading: boolean = false;

        openModal()
        {
            this.modalEdit = true;
        }

        get subTotal(): number
        {
            let sum = 0;
            this.carts.forEach((i)=>{
                sum += i!.quantity! * (i.product!.price! - (i.product!.discount || 0));
            });
            return sum;
        }

        get totalPrice(): string
        {
            return (this.subTotal * (1+this.getCommission)).toFixed(2);
        }

        async letsPay()
        {
            this.loading = true;
            await this.pay(<CheckoutCartsInterface>{cartsForCheckout: this.carts, userId: this.user.id});
            this.loading = false;
            this.$router.push("/waiting");
        }

        mounted()
        {
            this.fetchCommission();
        }

        @payment.Action(PAYMENTS_FETCH_COMMISSION) fetchCommission !: Function;
        @payment.Getter(PAYMENT_GET_COMMISSION) getCommission !: number;
        @payment.Action(PAYMENTS_PAY) pay !: Function;
        @user.Getter(USER_GET_USER) user !: User;
    }
</script>