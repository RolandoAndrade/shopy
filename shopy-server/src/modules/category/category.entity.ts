import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductCategory } from "../product-category/product-category.entity";
import { CategoryType } from "../category-type/category-type.entity";

@Entity({ name: 'categories' })
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @JoinColumn({ name: 'fk_category_type_id' })
    @ManyToOne(type => CategoryType, categoryType => categoryType.categories,
        { nullable: false })
    categoryType: CategoryType;

    @OneToMany(type => ProductCategory, productCategory => productCategory.category,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    productCategories?: ProductCategory[];
}