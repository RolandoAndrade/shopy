import { Payment } from "../payment.entity";
import { NewOrder } from "./new-order";

export interface NewPayment {
    payment: Payment,
    order: NewOrder
}