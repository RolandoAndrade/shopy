import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity({ name: 'product_images' })
export class ProductImage extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    image: string;

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.productImages,
        { nullable: false })
    product: Product;

}