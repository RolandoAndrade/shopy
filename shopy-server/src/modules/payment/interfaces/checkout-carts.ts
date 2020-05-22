import { Cart } from "src/modules/cart/cart.entity";

export interface CheckoutCarts {
    userId: number,
    cartsForCheckout: Cart[]
}