<template>
    <v-dialog v-model="modalEdit" scrollable max-width="600px">
        <v-card>
            <v-card-title>{{this.$language.get('my-product.edit')}}!</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;padding-top:80px;">
                <ProductImages :product="product" :edit="true" />
                <Title size="title-secondary" class="mt-6">{{this.$language.get('generic.title')}}:</Title>
                <input
                    v-model="productEdit.name"
                    type
                    class="form__input mt-6 mb-10"
                    style="width:100%;"
                    :placeholder="product.name"
                    id="name"
                    required
                />
                <Title size="title-secondary">{{this.$language.get('product.description')}}:</Title>
                <input
                    v-model="productEdit.description"
                    type
                    class="form__input mb-10"
                    style="width:100%;"
                    :placeholder="product.description"
                    id="name"
                    required
                />

                <div class="flex mb-10 mt-6">
                    <Title
                        size="title-secondary"
                        class="mr-4"
                    >{{this.$language.get('product.dimentions')}}:</Title>
                    <input
                        v-model="productEdit.width"
                        type
                        class="form__input mr-2"
                        :placeholder="product.width"
                        id="name"
                        required
                    />
                    x
                    <input
                        v-model="productEdit.height"
                        type
                        class="form__input ml-2"
                        :placeholder="product.height"
                        id="name"
                        required
                    />
                </div>
                <div class="flex mb-10 mt-6">
                    <Title
                        size="title-secondary"
                        class="mr-4"
                    >{{this.$language.get('product.price')}}:</Title>
                    <div class="flex">
                        <input
                            v-model="productEdit.price"
                            type
                            class="form__input mr-4"
                            :placeholder="product.price"
                            id="name"
                            required
                        />
                    </div>
                    <Title size="title-secondary">{{this.$language.get('product.quantity')}}:</Title>
                    <div class="flex">
                        <input
                            v-model="productEdit.stock"
                            type
                            class="form__input mr-4"
                            :placeholder="product.stock"
                            id="name"
                            required
                        />
                    </div>
                </div>
                <div class="flex mb-4">
                    <v-radio-group v-model="productEdit.condition" row class="ml-4">
                        <v-radio
                            :label="this.$language.get('product.used')"
                            :value="this.$language.get('product.used')"
                            color="orange"
                        ></v-radio>
                        <v-radio
                            :label="this.$language.get('product.new')"
                            :value="this.$language.get('product.new')"
                            color="orange"
                        ></v-radio>
                    </v-radio-group>
                </div>
                <div class="text-error mt-2">{{ numberErrors }}</div>
                <div v-for="(i, ind) in infoErrors" :key="ind" class="text-error mt-2">{{ i }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="space-between">
                    <v-btn
                        color="purple"
                        text
                        @click="modalEdit = false"
                    >{{this.$language.get('generic.close')}}</v-btn>
                    <v-btn
                        color="purple"
                        text
                        @click="saveChanges"
                    >{{this.$language.get('generic.save')}}</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { Product } from '../../../requests/products/Product';
import { ProductInterface } from '../../../interfaces/product.interface';
import Title from '@/components/typography/Title.vue';
import { validationMixin } from 'vuelidate';
import { maxLength, minValue, required } from 'vuelidate/lib/validators';
import ProductImages from '@/components/products/ProductImages.vue';

@Component({
    components: { Title, ProductImages },
    mixins: [validationMixin],
    validations: {
        productEdit: {
            price: { minValue: minValue(1) },
            width: { minValue: minValue(1) },
            height: { minValue: minValue(1) },
            stock: { minValue: minValue(1) },
            title: { required, maxLength: maxLength(25) },
            description: { required }
        }
    }
})
export default class EditPopupDecition extends Vue {
    @Prop() product!: Product;
    private modalEdit: boolean = false;
    // de prueba
    private productEdit: Product = {
        id: 0,
        name: '',
        price: 1,
        user: '',
        new: true,
        description: '',
        width: 1,
        height: 1,
        stock: 5,
        productImages: this.product.productImages
    };

    private openModal() {
        this.modalEdit = true;
    }

    get numberErrors() {
        let error = '';
        if (
            !this.$v.productEdit.price!.$invalid &&
            !this.$v.productEdit.width!.$invalid &&
            !this.$v.productEdit.height!.$invalid &&
            !this.$v.productEdit.stock!.$invalid
        )
            return error;
        else error = this.$language.get('my-product.errors.greater-than-zero');
        return error;
    }

    get infoErrors() {
        const errors: Array<string> = [];
        if (
            !this.$v.productEdit.price!.$invalid &&
            !this.$v.productEdit.width!.$invalid &&
            !this.$v.productEdit.height!.$invalid &&
            !this.$v.productEdit.stock!.$invalid &&
            !this.$v.productEdit.title!.$invalid &&
            !this.$v.productEdit.description!.$invalid
        )
            return errors;
        if (!this.$v.productEdit.title!.maxLength) {
            errors.push(this.$language.get('sell.step-2.errors.characters'));

        }/* else {
            errors.push(this.$language.get('sell.step-2.errors.all-filled'));
        }*/
        return errors;
    }

    private saveChanges() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            this.product = this.productEdit;
        }
    }
}
</script>

<style>
</style>