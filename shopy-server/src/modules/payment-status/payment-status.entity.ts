import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Payment } from "../payment/payment.entity";
import { Status } from "../status/status.entity";

@Entity({ name: 'payment_statuses' })
export class PaymentStatus extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'timestamp', nullable: false })
    date: string;

    @JoinColumn({ name: 'fk_payment_id' })
    @ManyToOne(type => Payment, payment => payment.paymentStatuses,
        { nullable: false })
    payment: Payment;

    @JoinColumn({ name: 'fk_status_id' })
    @ManyToOne(type => Status, status => status.paymentStatuses,
        { nullable: false })
    status: Status;
}