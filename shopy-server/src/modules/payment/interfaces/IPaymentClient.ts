export interface IPaymentClient {
    createOrder(order: number, price: number, description: string): any;
}