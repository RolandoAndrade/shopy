import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    score: number;

    @Column({ type: 'varchar' })
    comment?: string;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.reviews,
        { nullable: false })
    user: User;

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.reviews,
        { nullable: false })
    product: Product;
}