import { Injectable, ConflictException, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ILogger } from 'src/logger/ILogger';
import { logger } from 'src/logger/loggerConst';
import { UserSignup } from './interfaces/user-signup';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserSignin } from './interfaces/user-signin';
import { JwtPayload } from './interfaces/jwt-payload';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGoogleSignin } from './interfaces/user-google-signin';
import { Payload } from './interfaces/payload';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

    private logger: ILogger;

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) {
        this.logger = logger;
    }

    /**
     * signin
     * @param userSignin: UserSignin
     * @returns Promise<Payload>
     */
    async signin(userSignin: UserSignin): Promise<Payload>{
        this.logger.log(`signin: Iniciando sesión [email: ${userSignin.email}]`,
            'AuthService');
        
        const { email, password } = userSignin;

        const user = await this._authRepository.findOne({ relations: ['role', 'person', 'badge'], where: { email: email } });

        if(!user){
            throw new NotFoundException();
        }

        if(user.federate){
            throw new ForbiddenException();
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            throw new UnauthorizedException();
        } 

        return await this.createPayloadResponse(user);
    }

    /**
    * googleSignin
    * @param userGoogleSignin: UserGoogleSignin
    * @returns Promise<string>
    */
    async googleSignin(userGoogleSignin: UserGoogleSignin): Promise<Payload> {
        
        if (!userGoogleSignin) {
            throw new BadRequestException();
        }

        let user = await this._authRepository.findOne({ relations: ['role','person','badge'], where: { email: userGoogleSignin.email } });

        if(!user) {
            user = await this._authRepository.signupGoogle(userGoogleSignin);
        } 

        return await this.createPayloadResponse(user);
    }

    /**
    * signup
    * @param userSignup: UserSignup
    * @returns Promise<Boolean>
    */
    async signup(userSignup: UserSignup): Promise<Boolean> {
        this.logger.log(`signup: Creando a un nuevo usuario [user: ${JSON.stringify(userSignup)}]`,
            'AuthService');

        const userExist = await this._authRepository.findOne({ email: userSignup.user.email });

        if(userExist){
            throw new ConflictException();
        }

        const salt = await genSalt(10);
        userSignup.user.password = await hash(userSignup.user.password,salt);

        return await this._authRepository.signup(userSignup.user, userSignup.person); 
    }

    /**
    * createPayloadResponse
    * @param user: User
    * @returns Promise<Payload>
    */
    async createPayloadResponse(user: User): Promise<Payload>{
        this.logger.log(`createPayloadResponse: Creando la respuesta de un usuario  [user: ${JSON.stringify(user)}]`,
            'AuthService');

        const tokenPayload: JwtPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return {
            token: await this._jwtService.sign(tokenPayload),
            user: user
        } 
    }
}
