import { Controller, Post, Get, Param, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor, Put, Body } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { logger } from 'src/logger/loggerConst';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
//@UseGuards(AuthGuard())
export class UserController {

    private logger: ILogger;

    constructor(private readonly userService: UserService) {
        this.logger = logger;
    }


    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Param('id', new ParseIntPipe()) userId: number): Promise<User> {
        this.logger.log('getUser: Obteniendo a un usuario',
            'UserController');

        return this.userService.getUser(userId);
    }

    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    updateUser(@Param('id', new ParseIntPipe()) userId: number, @Body() user: User): Promise<User> {
        this.logger.log('updateUser: Actualizando a un usuario',
            'UserController');

        return this.userService.updateUser(user);
    }

    @Get('/products/:id')
    getUserProducts(@Param('id', new ParseIntPipe()) userId: number): Promise<User> {
        this.logger.log('getUserCarts: Obteniendo los productos de un usuario',
            'UserController');

        return this.userService.getUserProducts(userId);
    }

    @Get(':id/carts')
    getUserCarts(@Param('id', new ParseIntPipe()) userId: number): Promise<User> {
        this.logger.log('getUserCarts: Obteniendo los carritos de compra de un usuario',
            'UserController');

        return this.userService.getUserCarts(userId);
    }

    @Get(':id/shopping-histories')
    getUserShoppingHistories(@Param('id', new ParseIntPipe()) userId: number): Promise<User> {
        this.logger.log('getUserShoppingHistories: Obteniendo los historiales de compra de un usuario',
            'UserController');

        return this.userService.getUserShoppingHistories(userId);
    }
}
