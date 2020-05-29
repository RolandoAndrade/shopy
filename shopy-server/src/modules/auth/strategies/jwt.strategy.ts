import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { ConfigKeys } from 'src/config/config.keys';
import { JwtPayload } from '../interfaces/jwt-payload';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(ConfigKeys.JWT_SECRET),
        });
    }

    async validate(payload: JwtPayload){
        const { email } = payload;

        const user = await this._authRepository.findOne({ email: email })

        if(!user){
            throw new UnauthorizedException();
        }

        return payload;
    }
}