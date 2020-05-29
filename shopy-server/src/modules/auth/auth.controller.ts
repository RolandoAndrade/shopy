import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { AuthService } from './auth.service';
import { UserSignin } from './interfaces/user-signin';
import { UserSignup } from './interfaces/user-signup';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from './interfaces/payload';

@Controller('auth')
export class AuthController {

    private logger: ILogger;

    constructor(
        private readonly _authService: AuthService,
    ) {
        this.logger = logger;
    }

    
    @Post('signin')
    async signin(@Body() userSignin: UserSignin): Promise<Payload>{
        this.logger.log(`signin: Iniciando sesión [email: ${userSignin.email}]`,
            'AuthController');
        
        return await this._authService.signin(userSignin);
    }

    @Post('signup')
    async signup(@Body() userSignup: UserSignup): Promise<Boolean>{
        this.logger.log(`signup: Creando a un usuario nuevo`,
             'AuthController');

        return await this._authService.signup(userSignup);
    }

    @Get('google/signin')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req): Promise<Payload> {
        this.logger.log(`googleAuthRedirect: Redirección de google`,
            'AuthController');

        return this._authService.googleSignin(req.user)
    }
}
