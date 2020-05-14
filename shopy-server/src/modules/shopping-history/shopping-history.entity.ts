import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";
import { Product } from "../product/product.entity";

@Entity({ name: 'shopping_history' })
export class ShoppingHistory extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @Column({ type: 'float', nullable: false })
    price: number;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.shoppingHistories)
    user?: User;

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.shoppingHistories)
    product?: Product;

    @JoinColumn({ name: 'fk_payment_id' })
    @ManyToOne(type => Payment, payment => payment.shoppingHistories,
        { nullable: false })
    payment: Payment;
}