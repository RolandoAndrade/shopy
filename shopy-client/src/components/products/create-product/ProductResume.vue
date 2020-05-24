<template>
    <div>
        <div color="white" class="card-finish mb-12 mt-6">
            <div class="space-around to-column pa-10">
                <div class="flex column half">
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.name')}}:</Title>
                        <Title size="title-terciary ">{{
                            product.title
                        }}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.description')}}:</Title>
                        <Title size="title-terciary ">{{
                            product.description
                        }}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.condition')}}:</Title>
                        <Title size="title-terciary ">{{
                            product.condition
                        }}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.quantity')}}:</Title>
                        <Title size="title-terciary ">{{
                            product.stock
                        }}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.dimentions')}}:</Title>
                        <Title size="title-terciary "
                            >{{ product.width }} x {{ product.height }}</Title
                        >
                    </div>
                </div>
                <div class=" flex column half">
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">{{this.$language.get('product.price')}}:</Title>
                        <Title size="title-terciary ">{{
                            product.price
                        }}</Title>
                    </div>
                    <div class="inline mb-6 start">
                        <div class="flex column">
                            <v-combobox
                                :items="categoriesName"
                                :label="this.$language.get('filters.categories.name')"
                                solo
                            ></v-combobox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="publishProduct"
                >{{this.$language.get('sell.step-4.btn-publish')}}!</ButtonSecondary
            >
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')"
                >{{this.$language.get('sell.btn-back')}}</ButtonSecondary
            >
        </div>
        <Popup
            ref="successModal"
            message="Your product has been successfuly published!"
            :response="true"
        />
    </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import { Product } from '@/requests/products/Product';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Popup from '@/components/generic/Popup.vue';
import Vue from 'vue';

@Component({
    components: {
        Title,
        ButtonSecondary,
        Popup
    }
})
export default class ProductResume extends Vue {
    @Prop() product!: Product;
    @Prop() categories!: Array<object>;

    $refs!: {
        successModal: any;
    };
    get categoriesName() {
        const categoryName: Array<string> = [];
        for (let i = 1; i < this.categories.length; i++) {
            const name = this.categories[i].name;
            categoryName.push(name);
        }
        return categoryName;
    }

    private publishProduct() {
        this.$refs.successModal.openModal();
    }
}
</script>

<style></style>
