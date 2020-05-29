import { Controller, Post, Body, Delete, Param, Query, ParseIntPipe, UseGuards, Get, Put } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { CartService } from './cart.service'
import { Cart } from './cart.entity';
import { logger } from 'src/logger/loggerConst';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('carts')
export class CartController {

    private logger: ILogger;

    constructor(
        private readonly cartService: CartService) {
        this.logger = logger;
    }

    @Get()
    async getCart(@Query() params: {userId: number}): Promise<Cart[]>
    {
        this.logger.log(`getCart: Obteniendo el carrito de compra de un usuario [${JSON.stringify(params)}]`,
            'CartController');
        return this.cartService.getCarts(params.userId);
    }

    @Post()
    createCart(@Body() cart: Partial<Cart>): Promise<Cart> {
        this.logger.log('createCart: Creando un carrito de compra',
            'CartController');

        return this.cartService.createCart(cart);
    }

    @Delete(':id')
    deleteCart(@Param('id', new ParseIntPipe()) cartId: number): Promise<DeleteResult> {
        this.logger.log('deleteCart: Eliminando un carrito de compra',
            'CartController');

        return this.cartService.deleteCart(cartId);
    }

    @Put(':id')
    updateCart(@Param('id', new ParseIntPipe()) id: number, @Body() cart: Cart): Promise<boolean>
    {
        this.logger.log('createCart: Actualizando un carrito de compra',
            'CartController');
        return this.cartService.update(id, cart);
    }
}
