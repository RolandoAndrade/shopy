import {ProductCreationStateInterface} from "@/store/products/interfaces/product.creation.state.interface";

export const PRODUCT_CREATION_EMPTY_STATE: ProductCreationStateInterface = {
    categories: [],
    isLoadingCategories: false
};