import { Module } from 'vuex';
import { PaymentStateInterface } from '@/store/payments/interfaces/payment.state.interface';
import { PAYMENT_EMPTY_STATE } from '@/store/payments/states/payment.states';
import {
    PAYMENTS_FETCH_COMMISSION,
    PAYMENTS_PAY
} from '@/store/payments/actions/payment.actions';
import { Commission } from '@/requests/commissions/Commission';
import { commissionRepository } from '@/requests/commissions/commission.repository';
import { PAYMENT_SET_COMMISSION } from '@/store/payments/mutations/payment.mutations';
import { PAYMENT_GET_COMMISSION } from '@/store/payments/getters/payment.getters';
import { NewOrderInterface } from '@/interfaces/new-order.interface';
import { CheckoutCartsInterface } from '@/interfaces/checkout-carts.interface';
import { paymentRepository } from '@/requests/payments/payment.repository';

const payment: Module<PaymentStateInterface, any> = {
    namespaced: true,
    state: PAYMENT_EMPTY_STATE,
    getters: {
        [PAYMENT_GET_COMMISSION](state): number {
            return (
                (state.commission.processorFee || 0) +
                (state.commission.serviceFee || 0)
            );
        }
    },
    mutations: {
        [PAYMENT_SET_COMMISSION](state, commission: Commission): void {
            state.commission = commission;
        }
    },
    actions: {
        async [PAYMENTS_FETCH_COMMISSION]({ commit }): Promise<boolean> {
            try {
                const c: Commission = await commissionRepository.get();
                commit(PAYMENT_SET_COMMISSION, c);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PAYMENTS_PAY](
            state,
            checkoutCarts: CheckoutCartsInterface
        ): Promise<NewOrderInterface> {
            try {
                const response: NewOrderInterface = (
                    await paymentRepository.post(checkoutCarts)
                ).order;
                window.open(response.payment_url, '_blank');
                return response;
            } catch (e) {
                return {} as NewOrderInterface;
            }
        }
    }
};
export default payment;
