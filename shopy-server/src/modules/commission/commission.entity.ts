import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "../payment/payment.entity";

@Entity({ name: 'commissions' })
export class Commission extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'service_fee', type: 'float', nullable: false })
    serviceFee: number;

    @Column({ name: 'processor_fee', type: 'float', nullable: false })
    processorFee: number;

    @Column({ type: 'boolean', nullable: false })
    active: boolean;

    @OneToMany(type => Payment, payment => payment.commission,
        { onUpdate: 'CASCADE' })
    payments?: Payment[];
}