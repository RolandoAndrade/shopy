import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "../product/product.entity";
import { Category } from "../category/category.entity";

@Entity({ name: 'product_categories' })
export class ProductCategory extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @JoinColumn({ name: 'fk_product_id' })
    @ManyToOne(type => Product, product => product.productCategories,
        { nullable: false })
    product: Product;

    @JoinColumn({ name: 'fk_category_id' })
    @ManyToOne(type => Category, category => category.productCategories,
        { nullable: false })
    category: Category;
}