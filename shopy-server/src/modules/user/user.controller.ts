import { Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { logger } from 'src/logger/loggerConst';

@Controller('users')
export class UserController {

    private logger: ILogger;

    constructor(private readonly userService: UserService) {
        this.logger = logger;
    }

    @Get(':id/carts')
    getUserCarts(@Param('id', new ParseIntPipe()) userId: number): Promise<User> {
        this.logger.log('getUserCarts: Obteniendo los carritos de compra de un usuario',
            'UserController');

        return this.userService.getUserCarts(userId);
    }
}
