# Shopy
----

## Descripción

Shopy es una aplicación e-commerce que tiene como objetivo trascender en el mundo comercial a traves del uso de criptomonedas como metodo de pago con el objetivo de apoyar el libre comercio sin intermediarios y de forma segura

## Configuración Frontend

Una vez que el repositorio se clono de forma correcta es necesario hacer

```bash
$ npm i
```

Ya teniendo todas las dependiencias instaladas es necesario crear los archivos de configuracion pertienentes (Estos archivos deben crearse en la raiz de shopy-client):

### .env

```
VUE_APP_PORT = 3000
VUE_APP_HOST = http://localhost
VUE_APP_CLOUDINARY_URL=cloudinary://358776226519691:66npnny3gpJs5wBSxbTXH1gPXxs@rolandoandrade
VUE_APP_CLOUD_NAME=rolandoandrade
VUE_APP_UPLOAD_PRESET=rolando_andrade
VUE_APP_LOB_KEY=live_71ce65d05770affffaf929b0d08b596250c
```

### firebaseConfig.ts

```
export const firebaseConfig = {
    apiKey: "AIzaSyBJdXLVoN1g8YW0zfmKV0lrAeWM8DIhOvg",
    authDomain: "shopy-d39ca.firebaseapp.com",
    databaseURL: "https://shopy-d39ca.firebaseio.com",
    projectId: "shopy-d39ca",
    storageBucket: "shopy-d39ca.appspot.com",
    messagingSenderId: "609712225528",
    appID: "1:609712225528:web:d25ef0c6c7447b34698f0d",
  };
```

Una vez colocados los archivos de configuración en su sitio, ya es posible iniciar el servidor con el comando:

```bash
$ npm run serve
```

## Framework Utilizado

<p align="center">
  <a href="https://vuejs.org/" target="blank"><img src="https://vuejs.org/images/logo.png" width="200" alt="Vue Logo" /></a>
</p>

## Autores

- Rolando Andrade - [RolandoAndrade](https://github.com/RolandoAndrade)
- Stephanie Cruz - [stephanie-cruz](https://github.com/stephanie-cruz)
- Gabriel Terán - [gtwenty4](https://github.com/gtwenty4)

## Licencia

  Shopy usa licencia [MIT licensed](LICENSE).
