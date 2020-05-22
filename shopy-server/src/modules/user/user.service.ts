import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';

@Injectable()
export class UserService {

    private logger: ILogger;
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.logger = logger;
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
}
