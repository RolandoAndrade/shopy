import {Product} from "@/requests/products/Product";

export interface ProductsViewInterface {
    products: Product[],
    total: number
}