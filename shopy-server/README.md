
# Shopy
----

## Descripción

Shopy es una aplicación e-commerce que tiene como objetivo trascender en el mundo comercial a traves del uso de criptomonedas como metodo de pago con el objetivo de apoyar el libre comercio sin intermediarios y de forma segura

## Configuración Backend

Una vez que el repositorio se clono de forma correcta es necesario hacer

```bash
$ npm i
```

Ya teniendo todas las dependiencias instaladas es necesario crear los archivos de configuracion pertienentes (Estos archivos deben crearse en la raiz de shopy-server):

### .env

```
PORT = 3000
HOST = localhost
USERNAME = Usuario de base de datos
PASSWORD = Contraseña de la base de datos
DATABASE = Nombre de la base de datos
PORT_DATABASE = Puerto de la base de datos
JWT_SECRET = destino_o_casualidad_1245454584
SEND_GRID_API_KEY = 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
POEDITOR_KEY = 2cc261005eaf01e6f30bfec54ead1b4f
POEDITOR_PROJECT = 342377
CRIPTO_TEST_APY_KEY = AhRxx1uBxYyyAByDCXjb8bL1iszzcshCksAXaksv
BLOCKCHAIN_MODE = TEST
PRODUCTION_URL = Url de producción
```
NOTA: Posteriormente se mencionará que se coloca en PRODUCTION_URL, por los momentos puede quedar vacío o asignarle ''

### ormconfig.json
```
{
    "type": "postgres",
    "host": "localhost",
    "port": Puerto de la base de datos,
    "username": Usuario de base de datos,
    "database": Nombre de la base de datos,
    "password": Contraseña de la base de datos,
    "schema": Nombre del schema en donde esta la base de datos,
    "entities": [
        "dist/**/**.entity{.ts,.js}"
    ],
    "migrations": [
        "src/database/migrations/*{.ts,.js}"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}
```

Cabe destacar que anteriormente se debio haber creado una base de datos PostgreSQL vacía. Esta se pudo haber creado desde la linea de comando o a través del editor de postgreSQL PGAdmin4. Tambien se puede hacer con IDEs de Base de datos como DataGrip

Una vez rellenado los campos del .env y el ormconfig se puede correr el siguiente comando:

```bash
$ npm run start
```

Esto ejecutará el servidor, esto no se hace con el objetivo de iniciar la aplicación, sino para crear la carpeta **dist** de la cual TypeORM va a sacar las entidades para la migración

### [Migración](https://typeorm.io/#/migrations)

Ya creada la carpeta **dist**, se debe crear la carpeta **migrations** dentro de la carpeta **database** 

<p align="center">
  <a target="blank"><img src="./documentation_resources/folder-migrations.png" width="320" alt="Nest Logo" /></a>
</p>

Esta carpeta va a poseer el archivo de migración necesario para crear la base de datos

NOTA: En el archivo package.json estan configurado los comandos para correr la migración en Windows y MacOs. Si se tiene una distribución de linux es necesario cambiar el valor de los siguientes comandos:

```
"migration:generate": "ts-node node_modules/.bin/typeorm migration:generate --config ./ormconfig.json --name",
"migration:run": "ts-node node_modules/.bin/typeorm migration:run --config ./ormconfig.json",
"migration:revert": "ts-node node_modules/.bin/typeorm migration:revert --config ./ormconfig.json",
```

Aclarodo esto, ya se puede ejecutar el comando:

```bash
$ npm run migration:generate nombre_migración
```

Este debería dar una salida parecida a:

<p align="center">
  <a target="blank"><img src="./documentation_resources/migration-generate.png"/></a>
</p>

Teniendo el archivo de migración, ya se puede ejecutarla la misma a través de:

```bash
$ npm run migration:run
```

Esto debería dar una salida parecida a:

<p align="center">
  <a target="blank"><img src="./documentation_resources/migration-run.png"/></a>
</p>

Esto es indicativo de que se creo todo correctamente. Si se desea borrar las tablas de la base de datos solo es necesario ejecutar:

```bash
$ npm run migration:reverse
```

Todo esto es con el fin de hacer un sistema casi agnostico del manejador de la base de datos. Asi mismo, provee de facilidad a la hora de versionar la misma base de datos

Con las tablas creadas, ya se pueden correr el script **start.sql** alojado en la carpeta **database** 

### [Ngrok](https://ngrok.com/docs)

<p align="center">
  <a target="blank"><img src="https://ngrok.com/static/img/overview.png"/></a>
</p>

Lo siguiente que hay que hacer es configurar ngrok. Ngrok nos va a servir para poder publicar nuestra aplicación en internet y con un certificado ssl

Para poder utilizar ngrok de la menjor manera es necesario crearse una cuenta de usuario. Una vez se haya creado la cuenta se puede descargar el archivo, este sera un **.zip** el cual posee el ejecutable, por lo que es recomendable descomprimirlo en un lugar que sea comodo para hacer referencia a el

Una vez descomprimido el **.zip** y teniendo nuestra cuenta creada, se debe ejecutar el siguiente comando:

```bash
$ ./ngrok authtoken YOUR_AUTH_TOKEN
```

NOTA: Esto se realiza en donde este el ejecutable de ngrok

El token al que se hace referencia en el comando anterior se nos debió haber dado una vez creada la cuenta. Esto nos generará un archivo de configuración

Ya teniendo esto, podemos ejecutar lo siguiente:

```bash
$ ./ngrok http 3000
```

Lo cual nos debe arrojar algo parecido a lo siguiente:

<p align="center">
  <a target="blank"><img src="./documentation_resources/ngrok.png"/></a>
</p>

Como se puede observar nos genera dos URL, una con HTTP y otra con HTTPS. Vamos a copiar esta ultima y la vamos a colocar en la variable del .env PRODUCTION_URL

Es recomendable que una vez ngrok este corriendo no lo cierre y cree otra terminal para seguir con las demas instrucciones

Cualquier duda con ngrok se puede comunicar con los dueños del repositorio o ver el siguiente video: https://www.youtube.com/watch?v=NqCYquO3byk

### [Coingate](https://coingate.com/)

Coingate es una pasarela de pagos con criptomonedas y tambien un exchange. Este provee soluciones para negocios que quieran incusrionar en el mundo de las cripto. Al mismo tiempo, provee de un ambiente de desarrollo en el cual se pueden usar testnets el cual es llamado [sandbox-coingate](https://sandbox.coingate.com/login)

Lo que se realizo anteriormente con ngrok es de vital importancia para poder realizar la integración con la pasarela de pago, por lo que se deben seguir los siguientes pasos con cautela

Primero se debe iniciar sesión en **sandbox-coingate** (https://sandbox.coingate.com/login), para esto se usaran las siguientes credenciales:

```
email:gabrielgatg12@gmail.com
password:krakatoacripto43!
```

Ya habiendo iniciado sesión, se encontraran con esto:

<p align="center">
  <a target="blank"><img src="./documentation_resources/coingate-dashboard.png"/></a>
</p>

Una vez aquí, se dirijen a **Account** y luego a **Mange Bussines**

<p align="center">
  <a target="blank"><img src="./documentation_resources/account-manage.png"/></a>
</p>

<p align="center">
  <a target="blank"><img src="./documentation_resources/manage-business.png"/></a>
</p>

Luego, se van a dirigir a **Business Settings**. En esta area podran introducir una URL, esta URL sera a la que coingate le envie notificaciones sobre el estado de los pagos, por lo cual se agregará la URL HTTPS que ngrok nos dio 

<p align="center">
  <a target="blank"><img src="./documentation_resources/website-address.png"/></a>
</p>

Ya con esta URL agregada en coingate nuestro sistema sera capaz de recibir sus notificaciones sobre las ordenes de pago. Todo esto se realiza de esta forma, ya que coingate maneja unas políticas muy estrictas, por lo que si se llega a enviar una petición con una URL no registrada y con la APY_KEY, sera bloqueada la cuenta

Al mismo tiempo por el hecho de no poder desplegar se realiza todo este procedimiento un tanto tedioso. Cabe destacar que ngrok si permite generar una URL personalizada y no aleatoria, el problema es que es para la versión paga

Una vez realizado todo esto, ya es posible iniciar el servidor con el comando antes visto:

```bash
$ npm run start
```

## Framework Utilizado

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Autores

- Rolando Andrade - [RolandoAndrade](https://github.com/RolandoAndrade)
- Stephanie Cruz - [stephanie-cruz](https://github.com/stephanie-cruz)
- Gabriel Terán - [gtwenty4](https://github.com/gtwenty4)

## Licencia

  Shopy usa licencia [MIT licensed](LICENSE).
