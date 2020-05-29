import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";
import { Product } from "../product/product.entity";

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

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.carts,
        { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: Product;

    @JoinColumn({ name: 'fk_payment_id' })
    @ManyToOne(type => Payment, payment => payment.carts)
    payment?: Payment;
}