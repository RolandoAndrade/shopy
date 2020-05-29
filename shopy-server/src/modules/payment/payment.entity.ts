import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Address } from "../address/address.entity";
import { Cart } from "../cart/cart.entity";
import { ShoppingHistory } from "../shopping-history/shopping-history.entity";
import { Wallet } from "../wallet/wallet.entity";
import { Commission } from "../commission/commission.entity";
import { PaymentStatus } from "../payment-status/payment-status.entity";

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'total_price', type: 'float', nullable: false })
    totalPrice: number;

    @Column({ type: 'timestamp', nullable: false })
    date?: string;

    @JoinColumn({ name: 'fk_address_id' })
    @ManyToOne(type => Address, address => address.payments,
        { nullable: true })
    address?: Address;

    @JoinColumn({ name: 'fk_commission_id' })
    @ManyToOne(type => Commission, commission => commission.payments,
        { nullable: false })
    commission: Commission;

    @JoinColumn({ name: 'fk_wallet_id' })
    @ManyToOne(type => Wallet, wallet => wallet.payments,
        { nullable: true })
    wallet?: Wallet;

    @OneToMany(type => PaymentStatus, paymentStatus => paymentStatus.payment,
        { cascade: true })
    paymentStatuses: PaymentStatus[];   
    
    @OneToMany(type => Cart, cart => cart.payment,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    carts: Cart[];  

    @OneToMany(type => ShoppingHistory, shoppingHistory => shoppingHistory.payment)
    shoppingHistories?: ShoppingHistory[];  
}