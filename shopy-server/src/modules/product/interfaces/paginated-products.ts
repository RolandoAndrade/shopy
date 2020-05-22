import { Product } from "../product.entity";

export interface PaginatedProducts {
    products: Product[],
    productsNumber: number
}