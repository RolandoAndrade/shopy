import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from 'src/config/config.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { ConfigKeys } from 'src/config/config.keys';
import { EXPIRATION_TIME } from './auth.constan';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { GoogleStrategy } from './strategies/google.strategy';
import {SendGridMailService} from "../mails/send-grid-mail.service";


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService){
        return {
          secret: configService.get(ConfigKeys.JWT_SECRET),
          signOptions: {
            expiresIn: EXPIRATION_TIME
          }
        }
      }
    })
  ],
  controllers: [AuthController],

  providers: [AuthService, JwtStrategy, GoogleStrategy, ConfigService, SendGridMailService],
  exports: [JwtStrategy, GoogleStrategy, PassportModule]

})
export class AuthModule {}
