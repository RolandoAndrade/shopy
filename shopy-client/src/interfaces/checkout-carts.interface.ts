import { Cart } from '@/requests/cart/Cart';

export interface CheckoutCartsInterface {
    userId: number;
    cartsForCheckout: Cart[];
}
