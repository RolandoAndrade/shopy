import { PaymentStateInterface } from '@/store/payments/interfaces/payment.state.interface';
import { Commission } from '@/requests/commissions/Commission';

export const PAYMENT_EMPTY_STATE: PaymentStateInterface = {
    commission: new Commission()
};
