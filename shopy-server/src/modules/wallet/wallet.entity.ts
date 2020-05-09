import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "../payment/payment.entity";

@Entity({ name: 'wallets' })
export class Wallet extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', nullable: false })
    hash: string;

    @OneToMany(type => Payment, payment => payment.wallet,
        { onUpdate: 'CASCADE' })
    payments?: Payment[];
}