import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Stock } from "../stock/stock.entity";
import { Payment } from "../payment/payment.entity";

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.carts,
        { nullable: false })
    user: User;

    @JoinColumn({ name: 'fk_stock_id' })
    @ManyToOne(type => Stock, stock => stock.carts,
        { nullable: false })
    stock: Stock;

    @JoinColumn({ name: 'fk_payment_id' })
    @ManyToOne(type => Payment, payment => payment.carts)
    payment?: Payment;
}