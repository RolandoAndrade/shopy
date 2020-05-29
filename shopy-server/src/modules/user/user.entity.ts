import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Role } from "../role/role.entity";
import { Badge } from "../badge/badge.entity";
import { Address } from "../address/address.entity";
import { ShoppingHistory } from "../shopping-history/shopping-history.entity";
import { Cart } from "../cart/cart.entity";
import { Review } from "../review/review.entity";
import { Product } from "../product/product.entity";
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Exclude()
    @Column({ type: 'text', default: '#####' })
    password: string;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'boolean', default: false })
    federate: boolean;

    @JoinColumn({ name: 'fk_person_id' }) 
    @OneToOne(type => Person, person => person.user,
        { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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

    @OneToMany(type => Product, prodcut => prodcut.user, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    products?: Product[];

    @OneToMany(type => Review, review => review.user, 
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    reviews?: Review[];
}