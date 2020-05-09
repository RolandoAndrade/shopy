import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "../review/review.entity";
import { Stock } from "../stock/stock.entity";
import { ProductCategory } from "../product-category/product-category.entity";

@Entity({ name: 'products' })
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'varchar', nullable: false })
    image: string;

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'float', nullable: false })
    score: number;

    @Column({ type: 'float', nullable: false })
    discount: number;

    @Column({ type: 'float', nullable: false })
    width: number;

    @Column({ type: 'float', nullable: false })
    height: number;

    @Column({ type: 'float', nullable: false })
    depth: number;

    @OneToMany(type => Review, review => review.product, 
        { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    reviews?: Review[];

    @OneToMany(type => Stock, stock => stock.product,
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    stockpile?: Stock[];

    @OneToMany(type => ProductCategory, productCategory => productCategory.product,
        { nullable: false ,cascade: true })
    productCategories: ProductCategory[];
}