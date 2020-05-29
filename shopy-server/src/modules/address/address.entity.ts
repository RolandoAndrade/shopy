import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'first_line', type: 'varchar', nullable: false })
    firstLine: string;

    @Column({ name: 'second_line', type: 'varchar', default: ''})
    secondLine: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    state: string;

    @Column({ name: 'postal_code', type: 'varchar', length: 6, nullable: false })
    postalCode: string;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, user => user.addresses,
        { nullable: false })
    user: User;

    @OneToMany(type => Payment, payment => payment.address,
        { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    payments?: Payment[];
}