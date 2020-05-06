import { Module } from '@nestjs/common';
import { CommisionService } from './commision.service';
import { CommisionController } from './commision.controller';

@Module({
  providers: [CommisionService],
  controllers: [CommisionController]
})
export class CommisionModule {}
