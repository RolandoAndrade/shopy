import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { ConfigKeys } from "../config/config.keys";
import { DatabaseModule } from '../database/database.module';
import { indexModules } from '../modules/indexModule';

@Module({
  imports: [
        ...indexModules,
        ConfigModule,
        DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    static port: number | string;
    constructor(private readonly _configService: ConfigService)
    {
        AppModule.port = this._configService.get(ConfigKeys.PORT)
    }
}
