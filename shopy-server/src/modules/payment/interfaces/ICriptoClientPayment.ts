import { IPaymentClient } from './IPaymentClient'

export interface ICriptoPaymentClient extends IPaymentClient {
    getExchangeRate():any;
}