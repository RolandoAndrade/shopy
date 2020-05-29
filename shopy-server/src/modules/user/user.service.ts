import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, getManager } from 'typeorm';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { Person } from '../person/person.entity';
import { RoleService } from '../role/role.service';
import { BadgeService } from '../badge/badge.service';

@Injectable()
export class UserService {

    private logger: ILogger;
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
        private readonly badgeService: BadgeService
    ) {
        this.logger = logger;
    }

    /**
     * updateUser
     * @param user: User
     * @returns Promise<User> 
     */
    async updateUser(user: User): Promise<User> {
        this.logger.log(`updateUser: Actualizando un usuario [userId: ${user.id}]`,
            'UserService');
        
        return await getManager().transaction(async transactionEntityManager => {
            try {
                const personTransactionRepository: Repository<Person> = transactionEntityManager.getRepository(Person);
                await personTransactionRepository.save(user.person);
                const userTransactionRepository: Repository<User> = transactionEntityManager.getRepository(User);
                return await userTransactionRepository.save(user);
            } catch (error) {
                throw error;
            }
        });
    }

    /**
    * getUser
    * @param id: number
    * @returns Promise<User>
    */
    async getUser(userId: number): Promise<User> {
        this.logger.log(`getUser: Obteniendo un usuario`,
            'UserService');

        return await this.userRepository
                        .createQueryBuilder('user')
                        .innerJoinAndSelect('user.person', 'person')
                        .innerJoinAndSelect('user.addresses', 'addresses')
                        .innerJoinAndSelect('user.badge', 'badge')
                        .where('user.id = :id ', { id: userId })
                        .getOne()
    }

    /**
    * getUserByEmail
    * @param email: string
    * @returns Promise<User>
    */
    async getUserByEmail(email: string): Promise<User> {
        this.logger.log(`getUserByEmail: Obteniendo un usuario por su email [email: ${email}]`,
            'UserService');

        return await this.userRepository
                        .createQueryBuilder('user')
                        .innerJoinAndSelect('user.addresses', 'addresses')
                        .innerJoinAndSelect('user.role', 'role')
                        .where('user.email = :email ', { email: email })
                        .getOne()
    }

    /**
    * getUserProducts
    * @param userId: number
    * @returns Promise<User>
    */
    async getUserProducts(userId: number): Promise<User> {
        this.logger.log(`getUserProducts: Obteniendo los productos de un usuario [userId: ${userId}]`,
            'UserService');

        return await this.userRepository.createQueryBuilder('user')
                                        .leftJoinAndSelect('user.products', 'products')
                                        .innerJoinAndSelect('products.stock', 'stock')
                                        .innerJoinAndSelect('products.productImages', 'productImages')
                                        .where('user.id = :id ', { id: userId })
                                        .getOne();
    }

    /**
    * getUserCarts
    * @param userId: number
    * @returns Promise<User>
    */
    async getUserCarts(userId: number): Promise<User> {
        this.logger.log(`getUserCarts: Obteniendo los carritos de compra de un usuario [userId: ${userId}]`,
            'UserService');

        return await this.userRepository
                        .createQueryBuilder('user')
                        .leftJoinAndSelect('user.carts', 'carts')
                        .innerJoinAndSelect('carts.product', 'product')
                        .where('user.id = :id ', { id: userId })
                        .getOne()
    }

    /**
    * getUserShoppingHistories
    * @param userId: number
    * @returns Promise<User>
    */
    async getUserShoppingHistories(userId: number): Promise<User> {
        this.logger.log(`getUserShoppingHistories: Obteniendo los historiales de compra de un usuario [userId: ${userId}]`,
            'UserService');

        return await this.userRepository
                        .createQueryBuilder('user')
                        .leftJoinAndSelect('user.shoppingHistories', 'shoppingHistories')
                        .innerJoinAndSelect('shoppingHistories.payment', 'payment')
                        .innerJoinAndSelect('shoppingHistories.product', 'product')
                        .where('user.id = :id ', { id: userId })
                        .getOne()
    }
}
