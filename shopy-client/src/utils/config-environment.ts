import { ConfigKeys } from '@/constants/config.keys';
import * as fs from 'fs';
import { parse } from 'dotenv';

class ConfigEnvironment {
    private readonly envConfig: { [key: string]: string | undefined };

    constructor() {
        this.envConfig = {};
        if (process.env.NODE_ENV != ConfigKeys.TEST_ENVIRONMENT) {
            for (const i in process.env) {
                this.envConfig[i] = process.env[i];
            }
        } else {
            const envFilePath = __dirname + '/../../.env.test';
            const exist = fs.existsSync(envFilePath);
            if (exist) {
                this.envConfig = parse(fs.readFileSync(envFilePath));
            } else {
                console.error(
                    'Debe crear un .env.test en el directorio raíz del proyecto'
                );
                process.exit(0);
            }
        }
    }

    get(key: string): string {
        return this.envConfig[key] || '';
    }
}

export const configEnvironment = new ConfigEnvironment();
