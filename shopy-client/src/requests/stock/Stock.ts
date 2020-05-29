import { Product } from '@/requests/products/Product';

export class Stock {
    id?: number;
    quantity?: number;
    minimumQuantity?: number;
    product?: Product;

    constructor(quantity: number, minimumQuantity = 1) {
        this.quantity = quantity;
        this.minimumQuantity = minimumQuantity;
    }
}
