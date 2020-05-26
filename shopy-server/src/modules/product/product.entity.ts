import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Review } from "../review/review.entity";
import { Stock } from "../stock/stock.entity";
import { ProductCategory } from "../product-category/product-category.entity";
import { User } from "../user/user.entity";
import { ShoppingHistory } from "../shopping-history/shopping-history.entity";
import { Cart } from "../cart/cart.entity";
import { ProductImage } from "../product-image/product-image.entity";

@Entity({ name: 'products' })
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'float', default: 0})
    score: number;

    @Column({ type: 'float', default: 0})
    discount: number;

    @Column({ type: 'float', default: 0})
    width: number;

    @Column({ type: 'float', default: 0})
    height: number;

    @Column({ type: 'float', default: 0})
    depth: number;

    @Column({ type: 'boolean', nullable: false })
    new: boolean;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.products,
        { nullable: false })
    user: User;

    @OneToOne(type => Stock, stock => stock.product,
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    stock?: Stock;

    @OneToMany(type => Review, review => review.product, 
        { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    reviews?: Review[];

    @OneToMany(type => ShoppingHistory, shoppingHistory => shoppingHistory.product,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    shoppingHistories?: ShoppingHistory[];

    @OneToMany(type => Cart, cart => cart.product,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    carts?: Cart[];

    @OneToMany(type => ProductCategory, productCategory => productCategory.product,
        { cascade: true })
    productCategories?: ProductCategory[];

    @OneToMany(type => ProductImage, productImage => productImage.product,
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    productImages?: ProductImage[];
}