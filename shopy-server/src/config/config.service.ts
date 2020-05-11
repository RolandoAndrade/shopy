import  * as fs from 'fs'
import {parse} from 'dotenv'

export class ConfigService
{
    private readonly envConfig: {[key: string]:string};

    constructor() {
        const isDevelopmentEnvironment = process.env.NODE_ENV !== 'production';
        if(isDevelopmentEnvironment)
        {
            const envFilePath = __dirname + '/../../.env';
            const exist = fs.existsSync(envFilePath);
            if(exist)
            {
                console.log('Cargando las variables de entorno desde archivo');
                this.envConfig = parse(fs.readFileSync(envFilePath))
            }
            else
            {
                console.log('Error al cargar el .env');
                process.exit(0);
            }
        }
        else
        {
            const envFilePath = __dirname + '/../../.env';
            const exist = fs.existsSync(envFilePath);
            if(exist)
            {
                console.log('Cargando las variables de entorno desde archivo');
                this.envConfig = parse(fs.readFileSync(envFilePath))
            }
            else
            {
                this.envConfig =
                {
                    PORT: process.env.PORT,
                    HOST: process.env.HOST,
                    USERNAME: process.env.USER,
                    PASSWORD: process.env.PASSWORD,
                    DATABASE: process.env.DATABASE,
                    JWT_SECRET: process.env.JWT_SECRET,
                    SEND_GRID_API_KEY: process.env.SG_API_KEY
                };
                console.log('Usando variables en el entorno');
            }

        }
    }

    get(key: string): string
    {
        return this.envConfig[key];
    }
}