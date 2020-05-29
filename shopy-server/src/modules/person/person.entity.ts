import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'persons' })
export class Person extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;
    
    @Column({ type: 'varchar', nullable: false })
    lastname: string;
    
    @Column({ name: 'birth_date', type: 'timestamp', default: new Date() })
    birthDate: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @OneToOne(type => User, user => user.person, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user?: User;
}