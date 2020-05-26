import {Product} from "../product.entity";
import {Category} from "../../category/category.entity";

export interface ProductCreationInterface {
    product: Product;
    categories: Category[];
}