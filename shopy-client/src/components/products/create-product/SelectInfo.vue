<template>
    <div>
        <div color="white" class="card-create mt-6 ">
            <div class="flex to-column-tablet margin-medium">
                <div class="column mr-10 pa-5 cover">
                    <div class="form__group ">
                        <input
                            v-model="productInfo.title"
                            type=""
                            class="form__input"
                            :placeholder="this.$language.get('sell.step-2.title')"
                            id="name"
                            required
                        />
                        <label for="name" class="form__label"
                            >{{this.$language.get('sell.step-2.name')}}</label
                        >
                    </div>
                    <v-textarea
                        filled
                        name="input-7-4"
                        :label="this.$language.get('sell.step-2.describe')"
                        color="orange"
                        v-model="productInfo.description"
                    ></v-textarea>

                    <v-radio-group v-model="productInfo.condition" row>
                        <v-radio
                            :label="this.$language.get('product.used')"
                            value="Used"
                            color="orange"
                        ></v-radio>
                        <v-radio
                            :label="this.$language.get('product.new')"
                            value="New"
                            color="orange"
                        ></v-radio>
                    </v-radio-group>
                    <div
                        v-for="(i, ind) in infoErrors"
                        :key="ind"
                        class="text-error mt-2"
                    >
                        {{ i }}
                    </div>
                </div>
                <div class="column  mb-4">
                    <Title :size="'title-secondary'" class="mr-5 mb-5"
                        >{{this.$language.get('product.price')}}:</Title
                    >
                    <div class="flex mb-4">
                        <div class="form__group mr-6">
                            <input
                                v-model="productInfo.price"
                                type="number"
                                class="form__number"
                                required
                            />
                        </div>
                        <div class="text-area mb-6">
                            <v-combobox
                                v-model="select"
                                :items="items"
                                dense
                                class=""
                                color="orange"
                                item-color="orange"
                                hide-details
                                single-line="true"
                            ></v-combobox>
                            <div class="text-error mt-2">
                                {{ currencieError }}
                            </div>
                        </div>
                    </div>
                    <div class="inline mb-4">
                        <div class="form__group mr-4">
                            <input
                                type="number"
                                v-model="productInfo.width"
                                class="form__number"
                                :placeholder="this.$language.get('product.width')"
                                id="width"
                                required
                            />
                            <label for="width" class="form__label"
                                >{{this.$language.get('product.width')}} (cm)</label
                            >
                        </div>

                        <div class="form__group">
                            <input
                                type="number"
                                v-model="productInfo.height"
                                class="form__number"
                                :placeholder="this.$language.get('product.height')"
                                id="height"
                                required
                            />
                            <label for="height" class="form__label"
                                >{{this.$language.get('product.height')}} (cm)</label
                            >
                        </div>
                    </div>
                    <div class="form__group">
                        <input
                            type="number"
                            v-model="productInfo.stock"
                            class="form__number"
                            id="quantity"
                            :placeholder="this.$language.get('product.quantity')"
                            required
                        />
                        <label for="quantity" class="form__label"
                            >{{this.$language.get('product.quantity')}}</label
                        >
                    </div>
                    <div class="text-error mt-2">{{ numberErrors }}</div>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="nextStep()"
                >{{this.$language.get('sell.btn-continue')}}</ButtonSecondary
            >
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')"
                >{{this.$language.get('sell.btn-back')}}</ButtonSecondary
            >
        </div>
        <!--  <Popup :dialog="dialog" :response="response" :message="messageDialog" v-on:closeDialog="closeDialog"/> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Title from '@/components/typography/Title.vue';
import Popup from '@/components/generic/Popup.vue';
import { ProductInterface } from '../../../interfaces/product.interface';
import { validationMixin } from 'vuelidate';
import { maxLength, minValue, required } from 'vuelidate/lib/validators';

@Component({
    components: {
        ButtonSecondary,
        Title,
        Popup
    },
    mixins: [validationMixin],
    validations: {
        productInfo: {
            price: { minValue: minValue(1) },
            width: { minValue: minValue(1) },
            height: { minValue: minValue(1) },
            stock: { minValue: minValue(1) },
            title: { required, maxLength: maxLength(25) },
            description: { required }
        }
    }
})
export default class SelectInfo extends Vue {
    private title = '';
    private description = '';
    private row = '';
    private items: Array<string> = ['$', 'Bs.F'];
    private select: string = this.items[0];
    private usedorNot = true;
    private currencieErrors = '';

    private dialog = false;
    private response?: boolean;
    private messageDialog?: string;

    private productInfo: ProductInterface = {
        id: 0,
        title: '',
        price: 1,
        author: '',
        condition: 'New',
        description: '',
        width: 1,
        height: 1,
        image: '',
        images: [],
        rating: 0,
        stock: 5
    };

    private nextStep() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else if (this.currencieError === '') {
            this.$emit('nextStep', this.productInfo);
        } else return;
    }

    get numberErrors() {
        let error = '';
        if (
            !this.$v.productInfo.price!.$invalid &&
            !this.$v.productInfo.width!.$invalid &&
            !this.$v.productInfo.height!.$invalid &&
            !this.$v.productInfo.stock!.$invalid
        )
            return error;
        else error = this.$language.get('sell.step-2.errors.invalid-field');
        return error;
    }

    get infoErrors() {
        const errors: Array<string> = [];
        if (
            !this.$v.productInfo.price!.$invalid &&
            !this.$v.productInfo.width!.$invalid &&
            !this.$v.productInfo.height!.$invalid &&
            !this.$v.productInfo.stock!.$invalid &&
            !this.$v.productInfo.title!.$invalid &&
            !this.$v.productInfo.description!.$invalid
        )
            return errors;
        if (!this.$v.productInfo.title!.maxLength) {
            errors.push(this.$language.get('sell.step-2.errors.characters'));
        } else {
            errors.push(this.$language.get('sell.step-2.errors.all-filled'));
        }
        return errors;
    }

    get currencieError() {
        let error = '';
        for (let i = 0; i < this.items.length; i++) {
            if (this.select === this.items[i]) {
                return error;
            }
        }
        error = this.$language.get('sell.step-2.errors.invalid-currency');
        return error;
    }
}
</script>

<style lang="scss"></style>
