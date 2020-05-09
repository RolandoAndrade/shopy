import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConfigKeys } from 'src/config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(configService: ConfigService) {
            return {
                ssl: false,
                type: 'postgres' as 'postgres',
                host: configService.get(ConfigKeys.HOST),
                username: configService.get(ConfigKeys.USERNAME),
                password: configService.get(ConfigKeys.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
        }
    })
]