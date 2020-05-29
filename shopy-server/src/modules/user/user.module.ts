import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PersonModule } from '../person/person.module';
import { RoleModule } from '../role/role.module';
import { BadgeModule } from '../badge/badge.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PersonModule,
    RoleModule,
    BadgeModule,
    AuthModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
