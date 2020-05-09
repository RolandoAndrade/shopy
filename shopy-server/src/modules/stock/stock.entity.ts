import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { ShoppingHistory } from "../shopping-history/shopping-history.entity";
import { Cart } from "../cart/cart.entity";
import { Product } from "../product/product.entity";

@Entity({ name: 'stockpile' })
export class Stock extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.stockpile,
        { nullable: false })
    user: User;

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.stockpile,
        { nullable: false })
    product: Product;

    @OneToMany(type => ShoppingHistory, shoppingHistory => shoppingHistory.stock,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    shoppingHistories?: ShoppingHistory[];

    @OneToMany(type => Cart, cart => cart.stock,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    carts?: Cart[];
}