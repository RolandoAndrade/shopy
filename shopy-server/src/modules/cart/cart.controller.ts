import { Controller, Post, Body, Delete, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { CartService } from './cart.service'
import { Cart } from './cart.entity';
import { logger } from 'src/logger/loggerConst';
import { DeleteResult } from 'typeorm';

@Controller('carts')
export class CartController {

    private logger: ILogger;

    constructor(private readonly cartService: CartService) {
        this.logger = logger;
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

}
