import {NewOrderInterface} from "@/interfaces/new-order.interface";
import {Payment} from "@/requests/payments/Payment";

export interface NewPaymentInterface {
    payment: Payment,
    order: NewOrderInterface
}