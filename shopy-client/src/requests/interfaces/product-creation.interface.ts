import {Product} from "@/requests/products/Product";
import {Category} from "@/requests/category/Category";

export interface ProductCreationInterface {
    product: Product,
    categories: Category[]
}