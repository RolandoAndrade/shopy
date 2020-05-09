import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'roles' })
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar' })
    description?: string;

    @OneToMany(type => User, user => user.role, 
        { onUpdate: 'CASCADE'})
    users?: User[];
}