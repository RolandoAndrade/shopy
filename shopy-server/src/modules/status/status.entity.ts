import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PaymentStatus } from "../payment-status/payment-status.entity";

@Entity({ name: 'statuses' })
export class Status extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @OneToMany(type => PaymentStatus, paymentStatus => paymentStatus.status,
        { onUpdate: 'CASCADE' })
    paymentStatuses?: PaymentStatus[];
}