import {ProductsViewStateInterface} from "@/store/products/interfaces/products.view.state.interface";

export const PRODUCTS_VIEW_EMPTY_STATE: ProductsViewStateInterface = {
    products: [],
    page: 1,
    total: 0,
    search: ""
};