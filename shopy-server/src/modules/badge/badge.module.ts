import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeService],
  controllers: [BadgeController],
  exports: [BadgeService]
})
export class BadgeModule {}
