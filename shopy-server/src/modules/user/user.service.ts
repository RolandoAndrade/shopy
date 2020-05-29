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
     * 
     * @param user: User
     * @param person: Person
     * @returns Promise<Boolean>
     */
    async createUser(user: User, person: Person): Promise<Boolean>{
        this.logger.log(`createUser: Creando a un usuario`,
            'UserService');

        user.role = await this.roleService.getGeneralRol();
        user.badge = await this.badgeService.getDolarBadge();

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const personTransactionRepository: Repository<Person> = transactionEntityManager.getRepository(Person);
                user.person = await personTransactionRepository.save(person);
                const userTransactionRepository: Repository<User> = transactionEntityManager.getRepository(User);
                await userTransactionRepository.save(user);
                return true;
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
                        .innerJoinAndSelect('user.addresses', 'addresses')
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
