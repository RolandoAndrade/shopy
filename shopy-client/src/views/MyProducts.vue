<template>
    <div class="flex">
        <div class="product-detail-container column to-cover-tablet">
            <div class="column  mt-4 mb-8 " style="margin:0 auto;">
                <Title size="title-secondary ">My Products</Title>
                <div class="title-center">products</div>
            </div>
            <div class="divider" style="height:1px; width:70%"></div>
            <div class="flex wrap cover" style="width:100%;">
                <ProductCard
                    v-for="(n, k) in this.visibleProducts"
                    :key="k"
                    :product="n"
                >
                    <div>
                        <v-btn color="success" icon @click="findProduct(n.id)">
                            <v-icon large> mdi-pencil-circle</v-icon>
                        </v-btn>
                        <v-btn color="error" icon @click="openDeleteModal">
                            <v-icon large> mdi-trash-can</v-icon>
                        </v-btn>
                    </div>
                </ProductCard>
            </div>
            <div style="margin:25px auto;">
                <v-pagination
                    total-visible="10"
                    v-model="currentPage"
                    :length="getLength"
                    circle
                    color="purple"
                    @input="changePage()"
                    class="xyz"
                ></v-pagination>
            </div>
        </div>
        <PopupDecition
            ref="decitionModal"
            :icon="true"
            @receiveResponse="receiveResponse"
            text="Are you sure you want to delete this publication?"
        />

        <v-dialog v-model="modalEdit" scrollable max-width="600px">
            <v-card v-if="currentProduct">
                <v-card-title>Edit your product!</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;padding-top:20px;">
                    <Title size="title-secondary">Title:</Title>
                    <input
                        v-model="currentProduct.title"
                        type=""
                        class="form__input mt-6 mb-10 "
                        style="width:100%;"
                        :placeholder="currentProduct.title"
                        id="name"
                        required
                    />
                    <Title size="title-secondary">Description:</Title>
                    <input
                        v-model="currentProduct.description"
                        type=""
                        class="form__input mb-10"
                        style="width:100%;"
                        :placeholder="currentProduct.description"
                        id="name"
                        required
                    />

                    <div class="flex mb-10 mt-6">
                        <Title size="title-secondary" class="mr-4"
                            >Dimentions:</Title
                        >
                        <input
                            v-model="currentProduct.width"
                            type=""
                            class="form__input mr-2"
                            :placeholder="currentProduct.width"
                            id="name"
                            required
                        />
                        x
                        <input
                            v-model="currentProduct.height"
                            type=""
                            class="form__input ml-2"
                            :placeholder="currentProduct.height"
                            id="name"
                            required
                        />
                    </div>
                    <div class="flex mb-10 mt-6">
                        <Title size="title-secondary" class="mr-4"
                            >Price:</Title
                        >
                        <div class="flex">
                            <input
                                v-model="currentProduct.price"
                                type=""
                                class="form__input mr-4"
                                :placeholder="currentProduct.price"
                                id="name"
                                required
                            />
                        </div>
                        <Title size="title-secondary">Quantity:</Title>
                        <div class="flex">
                            <input
                                v-model="currentProduct.stock"
                                type=""
                                class="form__input mr-4"
                                :placeholder="currentProduct.stock"
                                id="name"
                                required
                            />
                        </div>
                    </div>
                    <div class="flex mb-4">
                        <v-radio-group
                            v-model="currentProduct.condition"
                            row
                            class="ml-4"
                        >
                            <v-radio
                                label="Used"
                                value="Used"
                                color="orange"
                            ></v-radio>
                            <v-radio
                                label="New"
                                value="New"
                                color="orange"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <div class="text-error mt-2">{{ numberErrors }}</div>
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
                        <v-btn color="purple" text @click="modalEdit = false"
                            >Close</v-btn
                        >
                        <v-btn color="purple" text @click="saveChanges"
                            >Save changes</v-btn
                        >
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import { ProductInterface } from '../interfaces/product.interface';
import ProductCard from '@/components/cards/ProductCard.vue';
import Popup from '@/components/generic/Popup.vue';
import Icon from '@/components/typography/Icon.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import { maxLength, minValue, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

@Component({
    components: {
        Title,
        ProductCard,
        Popup,
        PopupDecition,
        Icon
    },
    mixins: [validationMixin],
    validations: {
        currentProduct: {
            price: { minValue: minValue(1) },
            width: { minValue: minValue(1) },
            height: { minValue: minValue(1) },
            stock: { minValue: minValue(1) },
            title: { required, maxLength: maxLength(25) },
            description: { required }
        }
    }
})
export default class MyProducts extends Vue {
    private visibleProducts: ProductInterface[] = [];
    private currentPage = 1;
    private pageSize = 6;

    $refs!: {
        decitionModal: any;
    };
    private modalEdit = false;
    private currentProduct?: ProductInterface;
    private myProducts: ProductInterface[] = [
        {
            id: 1,
            title: 'Banana',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 2,
            title: 'Laptop Pro Hp',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 3,
            title: 'Iphone 11 max',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 4,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 5,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 6,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 7,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 8,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 9,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        },
        {
            id: 10,
            title: 'Sacapuntas',
            price: 234,
            condition: 'New',
            description: 'Hola que tal',
            width: 12,
            height: 43,
            image: 'https://i.ytimg.com/vi/uHG7yNf-4k4/maxresdefault.jpg',
            stock: 2,
            author: 'Tete'
        }
    ];

    private openDeleteModal() {
        this.$refs.decitionModal.openModal();
    }

    private receiveResponse(response: string) {
        // no, yes
    }

    private findProduct(product: number) {
        this.currentProduct = this.myProducts.find(p => p.id === product);
        this.modalEdit = true;
    }

    get getLength() {
        return Math.ceil(this.myProducts.length / this.pageSize);
    }
    beforeMount() {
        this.updateVisibleProducts();
    }
    private changePage(): void {
        this.updateVisibleProducts();
    }
    private updateVisibleProducts() {
        this.visibleProducts = this.myProducts.slice(
            (this.currentPage - 1) * this.pageSize,
            (this.currentPage - 1) * this.pageSize + this.pageSize
        );
    }

    private nextStep() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            this.modalEdit = true;
        }
    }

    // mismos que en Select Info
    get numberErrors() {
        let error = '';
        if (
            !this.$v.currentProduct.price!.$invalid &&
            !this.$v.currentProduct.width!.$invalid &&
            !this.$v.currentProduct.height!.$invalid &&
            !this.$v.currentProduct.stock!.$invalid
        )
            return error;
        else error = 'The values must be greater than 0';
        return error;
    }

    get infoErrors() {
        const errors: Array<string> = [];
        if (
            !this.$v.currentProduct.price!.$invalid &&
            !this.$v.currentProduct.width!.$invalid &&
            !this.$v.currentProduct.height!.$invalid &&
            !this.$v.currentProduct.stock!.$invalid &&
            !this.$v.currentProduct.title!.$invalid &&
            !this.$v.currentProduct.description!.$invalid
        )
            return errors;
        if (!this.$v.currentProduct.title!.maxLength) {
            errors.push('The title must not contain more than  25 characters.');
        } else {
            errors.push('All fields must be filled!');
        }
        return errors;
    }
}
</script>

<style>
.form__input {
    font-size: 16px !important;
}
</style>
