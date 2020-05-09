import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "../payment/payment.entity";

@Entity({ name: 'commissions' })
export class Commission extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'float', nullable: false })
    percentage: number;

    @Column({ type: 'float', nullable: false })
    commission: number;

    @OneToMany(type => Payment, payment => payment.commission,
        { onUpdate: 'CASCADE' })
    payments?: Payment[];
}