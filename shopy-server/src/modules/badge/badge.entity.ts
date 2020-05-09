import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'foreign_exchange' })
export class Badge extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 5, nullable: false })
    simbol: string;

    @Column({ name: 'exchange_rate', type: 'float', nullable: false })
    exchangeRate: number;

    @OneToMany(type => User, user => user.badge,
        { onUpdate: 'CASCADE' })
    users?: User[];
}