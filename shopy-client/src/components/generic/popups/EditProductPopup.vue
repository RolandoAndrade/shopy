<template>
    <v-dialog v-model="modalEdit" scrollable max-width="600px">
        <v-card>
            <v-card-title
                >{{ this.$language.get('my-product.edit') }}!</v-card-title
            >
            <v-divider></v-divider>
            <v-card-text style="height: 300px;padding-top:80px;">
                <ProductImages
                    :product="product"
                    :edit="true"
                    ref="getChildData"
                    @update="update"
                />
                <Title size="title-terciary" class="mt-6"
                    >{{ this.$language.get('generic.title') }} :</Title
                >
                <input
                    v-model="product.name"
                    type
                    class="form__input mt-6 mb-10"
                    style="width:100%;"
                    :placeholder="productReset.name"
                    id="name"
                    required
                />
                <Title size="title-terciary"
                    >{{ this.$language.get('product.description') }} :</Title
                >
                <input
                    v-model="product.description"
                    type
                    class="form__input mb-10"
                    style="width:100%;"
                    :placeholder="productReset.description"
                    id="name"
                    required
                />
                <Title size="title-terciary" class="mr-4"
                    >{{ this.$language.get('product.dimentions') }} *:</Title
                >
                <div class="flex mb-10 mt-6 ">
                    <input
                        v-model="product.width"
                        type="number"
                        class="form__input mr-2"
                        :placeholder="productReset.width"
                        id="name"
                        required
                    />
                    x
                    <input
                        v-model="product.height"
                        type="number"
                        class="form__input ml-2"
                        :placeholder="productReset.height"
                        id="name"
                        required
                    />
                </div>

                <div class="flex mb-10 mt-6">
                    <div class="column half">
                        <Title size="title-terciary" class="mr-4"
                            >{{ this.$language.get('product.price') }} *:</Title
                        >
                        <div class="flex">
                            <input
                                type="number"
                                v-model="productReset.price"
                                class="form__input mr-4"
                                :placeholder="product.price"
                                id="name"
                                required
                            />
                        </div>
                    </div>

                    <div class="column half">
                        <Title size="title-terciary"
                            >{{
                                this.$language.get('product.quantity')
                            }}
                            *:</Title
                        >
                        <input
                            type="number"
                            v-model="product.stock.quantity"
                            class="form__input mr-4"
                            :placeholder="productReset.stock.quantity"
                            id="name"
                            required
                        />
                    </div>
                </div>
                <div class="flex mb-10 mt-6">
                    <div class="column half">
                        <Title size="title-terciary" class="mr-4"
                            >Disconunt:</Title
                        >
                        <div class="flex">
                            <input
                                type="number"
                                v-model="product.discount"
                                class="form__input mr-4"
                                :placeholder="productReset.discount"
                                id="discount"
                            />
                            <Title size="title-secondary" class="ms-4">%</Title>
                        </div>
                    </div>
                    <div class="column half">
                        <Title size="title-terciary" class="mr-4"
                            >Minimum Quantity:</Title
                        >
                        <div class="flex">
                            <input
                                type="number"
                                v-model="product.stock.minimumQuantity"
                                class="form__input mr-4"
                                :placeholder="
                                    productReset.stock.minimumQuantity
                                "
                                id="min_quantity"
                            />
                        </div>
                    </div>
                </div>
                <v-radio-group v-model="product.new" row class="half ">
                    <v-radio
                        :label="this.$language.get('product.used')"
                        :value="false"
                        color="orange"
                    ></v-radio>
                    <v-radio
                        :label="this.$language.get('product.new')"
                        :value="true"
                        color="orange"
                    ></v-radio>
                </v-radio-group>

                <div class="text-error mt-2">{{ imageError }}</div>
                <div
                    v-for="(i, ind) in numberErrors"
                    :key="ind"
                    class="text-error mt-2"
                >
                    {{ i }}
                </div>
                <div
                    v-for="(i, ind) in infoErrors"
                    :key="ind"
                    class="text-error mt-2"
                >
                    {{ i }}
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="space-between">
                    <v-btn color="purple" text @click="close">{{
                        this.$language.get('generic.close')
                    }}</v-btn>
                    <v-btn color="purple" text @click="saveChanges">{{
                        this.$language.get('generic.save')
                    }}</v-btn>
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
import {
    maxLength,
    minValue,
    maxValue,
    required
} from 'vuelidate/lib/validators';
import ProductImages from '@/components/products/ProductImages.vue';
import { productDetail } from '../../../store/namespaces';
import {
    PRODUCT_DETAIL_UPDATE_PRODUCT,
    PRODUCTS_DETAIL_FETCH_PRODUCT,
    PRODUCT_DETAIL_DELETE_IMAGES,
    PRODUCT_DETAIL_ADD_IMAGES
} from '../../../store/products/actions/products.detail.actions';
import { Images } from '../../../interfaces/productImages.interface';
import { ProductImage } from '../../../requests/product-image/ProductImage';
import { imagesIds } from '../../../interfaces/images.id.interface';
import { ProductImagesInterface } from '../../../requests/product-image/product-images.interface';
@Component({
    components: { Title, ProductImages },
    mixins: [validationMixin],
    validations: {
        product: {
            price: { minValue: minValue(1), required },
            width: { minValue: minValue(1), required },
            height: { minValue: minValue(1), required },
            name: { required, maxLength: maxLength(25) },
            discount: { minValue: minValue(0), maxValue: maxValue(100) },
            description: { required }
        }
    }
})
export default class EditProductPopup extends Vue {
    @Prop() product!: Product;
    private modalEdit = false;
    images: ProductImage[] = this.resetImages;
    imagesDeleted: ProductImage[] = [];
    newImages: ProductImage[] = [];
    ids?: imagesIds = { productImageIds: [] };
    $refs!: {
        getChildData: any;
    };

    private openModal() {
        this.modalEdit = true;
    }

    get resetImages() {
        return this.product.productImages!;
    }

    public update(
        images: ProductImage[],
        imagesDeleted: ProductImage[],
        newImages: ProductImage[]
    ) {
        this.images = images;
        this.imagesDeleted = imagesDeleted;
        this.newImages = newImages;
    }

    get numberErrors() {
        const errors: Array<string> = [];
        if (
            !this.$v.product.price!.$invalid &&
            !this.$v.product.width!.$invalid &&
            !this.$v.product.height!.$invalid &&
            this.product.stock!.minimumQuantity! > 0 &&
            this.product.stock!.quantity! > 0
        ) {
            if (!this.$v.product.discount!.$invalid) return errors;
            else
                errors.push(
                    'The discount must me less than 100 nor can it be a negative number'
                );
        } else {
            errors.push(
                this.$language.get('my-product.errors.greater-than-zero')
            );
        }
        return errors;
    }

    get infoErrors() {
        const errors: Array<string> = [];
        if (
            !this.$v.product.price!.$invalid &&
            !this.$v.product.width!.$invalid &&
            !this.$v.product.height!.$invalid &&
            !this.$v.product.name!.$invalid &&
            !this.$v.product.description!.$invalid
        )
            return errors;
        if (!this.$v.product.name!.maxLength) {
            errors.push(this.$language.get('sell.step-2.errors.characters'));
        } else {
            errors.push(this.$language.get('sell.step-2.errors.all-filled'));
        }
        return errors;
    }

    get imageError() {
        if (this.images.length === 0) {
            return this.$language.get('sell.step-3.error');
        }
    }

    private close() {
        // Object.assign(this.product.productImages, this.productReset.productImages);
        this.$refs.getChildData.resetData();
        this.modalEdit = false;
        Object.assign(this.product, this.productReset);
    }

    private saveChanges() {
        this.$refs.getChildData.bringData();
        this.$v.$touch();
        if (
            this.$v.$invalid ||
            this.images.length === 0 ||
            this.product.stock!.quantity! <= 0 ||
            this.product.stock!.minimumQuantity! <= 0
        ) {
            return;
        } else {
            this.updateProduct();
        }
    }

    get imagesIds() {
        const arraynumber: Array<number> = [];
        this.imagesDeleted.map(i => arraynumber.push(i.id!));
        if (arraynumber.length > 0) {
            this.ids!.productImageIds = arraynumber;
        }
        return this.ids!;
    }

    private async updateProduct() {
        await this.updateProducts(this.product);
        const ids = this.imagesIds;
        if (this.imagesDeleted.length > 0) await this.deleteImages(ids);
        if (this.newImages.length > 0) {
            const images: ProductImagesInterface = { productImages: [] };
            this.newImages.map(i =>
                images!.productImages!.push({
                    image: i.image,
                    product: this.product.id
                })
            );
            await this.addImages(images);
        }

        this.modalEdit = false;
    }

    @productDetail.Action('PRODUCT_DETAIL_UPDATE_PRODUCT')
    updateProducts!: Function;
    @productDetail.Getter('GET_PRODUCT_DATA')
    productReset!: Product;
    @productDetail.Action('PRODUCT_DETAIL_DELETE_IMAGES')
    deleteImages!: Function;
    @productDetail.Action('PRODUCT_DETAIL_ADD_IMAGES')
    addImages!: Function;
}
</script>

<style></style>
