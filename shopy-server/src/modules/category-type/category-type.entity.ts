import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Category } from "../category/category.entity";

@Entity({ name: 'category_types' })
export class CategoryType extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @OneToMany(type => Category, category => category.categoryType,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    categories?: Category[];
}