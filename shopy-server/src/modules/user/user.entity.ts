import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Role } from "../role/role.entity";
import { Badge } from "../badge/badge.entity";
import { Address } from "../address/address.entity";
import { ShoppingHistory } from "../shopping-history/shopping-history.entity";
import { Cart } from "../cart/cart.entity";
import { Stock } from "../stock/stock.entity";
import { Review } from "../review/review.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    username: string;

    @Column({ type: 'text', nullable: false, select: false })
    password: string;

    @JoinColumn({ name: 'fk_person_id' })
    @OneToOne(type => Person, person => person.user,
        { nullable: false })
    person: Person;

    @JoinColumn({ name: 'fk_role_id' })
    @ManyToOne(type => Role, role => role.users,
        { nullable: false })
    role: Role;

    @JoinColumn({ name: 'fk_badge_id' })
    @ManyToOne(type => Badge, badge => badge.users,
        { nullable: false })
    badge: Badge;

    @OneToMany(type => Address, address => address.user, 
        { nullable: false, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    addresses: Address[];

    @OneToMany(type => ShoppingHistory, shoppingHistory => shoppingHistory.user, 
        { cascade: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    shoppingHistories?: ShoppingHistory[];

    @OneToMany(type => Cart, cart => cart.user, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    carts?: Cart[];

    @OneToMany(type => Stock, stock => stock.user, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    stockpile?: Stock[];

    @OneToMany(type => Review, review => review.user, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    reviews?: Review[];
}