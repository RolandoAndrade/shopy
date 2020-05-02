import  * as fs from 'fs'
import {parse} from 'dotenv'

const ENV_FILE_PATH = __dirname + '/../../.env'; //es posible que sea necesario cambiar la ruta
const ENV_DEVELOPMENT_PATH = __dirname + '/../../.env.development';
class ConfigEnvironment
{
    private readonly envConfig: {[key: string]:string};

    constructor()
    {
        const isDevelopmentEnvironment = process.env.NODE_ENV !== 'production';
        if(isDevelopmentEnvironment)
        {
            const exist = fs.existsSync(ENV_DEVELOPMENT_PATH);
            if(exist)
            {
                this.envConfig = parse(fs.readFileSync(ENV_FILE_PATH))
            }
            else
            {
                console.log('Error al cargar el .env.development');
                process.exit(0);
            }
        }
        else
        {
            const exist = fs.existsSync(ENV_FILE_PATH);
            if(exist)
            {
                this.envConfig = parse(fs.readFileSync(ENV_FILE_PATH))
            }
            else
            {
                console.log('Error al cargar el .env');
                process.exit(0);
            }
        }
    }

    get(key: string): string
    {
        return this.envConfig[key];
    }
}

export const configEnvironment = new ConfigEnvironment();