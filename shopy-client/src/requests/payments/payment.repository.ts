import {AxiosRepository} from "@/requests/interfaces/axios.repository";
import {CheckoutCartsInterface} from "@/interfaces/checkout-carts.interface";
import {NewOrderInterface} from "@/interfaces/new-order.interface";
import {Payment} from "@/requests/payments/Payment";

const RESOURCE = 'payments/orders';

export class PaymentRepository extends AxiosRepository{
    constructor() {
        super(RESOURCE);
    }
    async post(checkoutCarts: CheckoutCartsInterface): Promise<{payment: Payment, order: NewOrderInterface}>
    {
        return super.post(checkoutCarts);
    }
}

export const paymentRepository = new PaymentRepository();