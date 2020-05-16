import {Product} from "@/requests/products/Product";

export interface ProductsViewStateInterface {
    products: Product[];
    total: number,
    page: number,
    search: string
}