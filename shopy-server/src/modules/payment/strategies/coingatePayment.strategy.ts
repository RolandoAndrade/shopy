import { ICriptoPaymentClient } from "../interfaces/ICriptoClientPayment";
import { ConfigService } from "../../../config/config.service";
import { ConfigKeys } from '../../../config/config.keys';
import { client, testClient } from "node_modules/coingate-v2"
import { MODE_TEST, PREFIX_CALLBACK_URL, PREFIX_CANCEL_URL, PREFIX_SUCCESS_URL, RECEIVE_CURRENCY, PRICE_CURRENCY, PAYMENT_TITLE } from "../payment.constants";


export class CoingatePaymentStrategy implements ICriptoPaymentClient {

    private client: any;
    private callbackURL: string;
    private cancelURL: string;
    private successURL: string;

    constructor(configService: ConfigService) {
        if (configService.get(ConfigKeys.BLOCKCHAIN_MODE) === MODE_TEST) {
            this.client = testClient(configService.get(ConfigKeys.CRIPTO_TEST_APY_KEY))
        }
        this.callbackURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_CALLBACK_URL}`;
        this.cancelURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_CANCEL_URL}`;
        this.successURL = `${configService.get(ConfigKeys.PRODUCTION_URL)}${PREFIX_SUCCESS_URL}`;
    }

    async createOrder(orderId: number, price: number, description: string) {
        
        return await this.client.createOrder({
            order_id: `${orderId}`,
            price_amount: price,
            price_currency: PRICE_CURRENCY,
            receive_currency: RECEIVE_CURRENCY,
            title: PAYMENT_TITLE,
            description: description,
            callback_url: this.callbackURL,
            cancel_url: this.cancelURL,
            success_url: this.successURL,
        })
    }

    getExchangeRate() {
        throw new Error("Method not implemented.");
    }
}