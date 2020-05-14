import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Product } from "../product/product.entity";

@Entity({ name: 'stockpile' })
export class Stock extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @Column({ name: 'minimum_quantity', type: 'int', nullable: false })
    minimumQuantity: number;

    @JoinColumn({ name: 'fk_product_id' })
    @OneToOne(type => Product, product => product.stock,
        { nullable: false })
    product: Product;

}