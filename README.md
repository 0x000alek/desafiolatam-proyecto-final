_A collaboration between [Melany Menares](https://github.com/milimenares) and [Alexis Olguín](https://github.com/0x000alek)_

# Backend con Node y Express (G86) - Proyecto Final

Este repositorio continene el dessarrollo de la solución propuesta para el _Proyecto Final_ del curso **Backend con Node y Express (G86)**.

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

### 1. Clona el repositorio

Para obtener una copia local del proyecto, ejecuta el siguiente comando:

```bash
git https://github.com/0x000alek/desafiolatam-proyecto-final.git
cd desafiolatam-proyecto-final
```

Esto descargará todo el código fuente y te posicionará dentro de la carpeta raíz del proyecto, lista para comenzar a trabajar.

### 2. Instala las dependencias

Este repositorio está organizado como un **monorepo** con dos proyectos independientes:

- `frontend/` → aplicación cliente React.

- `backend/` → API construida en Node.js/Express.

Cada proyecto tiene su propio package.json, por lo que debes instalar dependencias en ambos directorios:

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```
💡 Tip: Si usas npm run o npx dentro de cada carpeta, asegúrate de estar en el directorio correcto (frontend o backend).

### 3. Configuración de la Base de Datos

Antes de iniciar el proyecto, es necesario preparar la base de datos para que la aplicación pueda funcionar correctamente.  

#### Crear la base de datos
   Debes crear manualmente la base de datos en tu servidor PostgreSQL Para esto puedes hacerlo con el cliente de línea de comandos de PostgreSQL (`psql`) o con alguna herramienta gráfica como **pgAdmin**.

#### Ejecutar el script SQL de creación de tablas
En el repositorio se encuentra el script SQL [ddl.sql](backend/db/schema/ddl.sql) con la definición de todas las tablas, sus relaciones e incluso algunos inserts para estas.

Con la ayuda de este script podrás crear las tablas necesarias para asegurar el correcto funcionamiento de la aplicación, así como también poblar la base de datos con información suficiente para interactuar con la aplicación.

### 4. Configura las variables de entorno del backend

Una vez las dependencias hayan sido instaladas, en el proyecto `backend` se ejecutará automáticamente el script `postinstall`, el cual a su vez ejecuta el script `setup:env`.

`nsetup:env` se encarga de crear el archivo `.env` a partir del archivo `.env.example`, y de esta manera crear tu propia configuración local:

```bash
> wawita-backend@1.0.0 setup:env
> node scripts/setup-env.js .env.example .env

> .env created from .env.example
✔ .env file is ready.
```

Luego, abre el archivo `.env` y edita las variables según tu entorno de ejecución. Aquí deberás especificar detalles como los datos de conexión a la base de datos, el puerto del servidor y otras configuraciones sensibles que no se almacenan en el repositorio.

### 5. Inicia servidores

Una vez configuradas las dependencias y variables de entorno, puedes iniciar los servidores para interactuar con la aplicación web.

Tal como fue mencionado anteriormente, este repositorio está organizado como un **monorepo** con dos proyectos independientes (`backend` y `frontend`), por lo que deberás levantar cada servidor de forma separada:

#### Backend (`desafiolatam-proyecto-final/backend`)

```bash
npm run dev
```

Este comando utiliza la opción `--watch` de Node.js (requiere versión 18 o superior) para ejecutar server.js y reiniciar automáticamente el servidor cada vez que se detecten cambios en el código fuente. Esto facilita un flujo de desarrollo más ágil y eficiente.

Si todo está correctamente configurado, deberías ver en la terminal una salida similar a la siguiente:

```bash
> wawita-backend@1.0.0 dev
> node --watch index.js

[DD-MM-AAAA HH:mm:ss.SSS] info: Server on fire 🔥 http://localhost:5000
[DD-MM-AAAA HH:mm:ss.SSS] info: Database connected successfully: current_database at current_timestamp
```

📌 El valor `current_timestamp` representa la fecha y hora actual devuelta por la base de datos al momento de establecer la conexión. Es útil para confirmar que la base de datos respondió correctamente y que está sincronizada con el servidor en cuanto a tiempo. Normalmente corresponde al resultado del comando SQL _SELECT NOW()_.

Por otro lado, el valor `current_database` indica el nombre de la base de datos a la que se ha establecido la conexión. Este valor se obtiene mediante el comando SQL _SELECT current_database()_ y permite verificar que la aplicación está conectada al entorno correcto (por ejemplo, desarrollo, pruebas o producción).

Por último, asegúrate de que los valores de la URL, el puerto y la base de datos coincidan con los definidos en tu archivo `.env`.

#### Frontend (`desafiolatam-proyecto-final/frontend`)

```bash
npm run dev
```

Cuando ejecutas `npm run dev`, lo que ocurre internamente es que **npm llama al script dev**, que a su vez ejecuta directamente el comando `vite`.

Si todo está correctamente configurado, deberías ver en la terminal una salida similar a la siguiente:

```bash
VITE v7.1.2  ready in 280 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

📌 `VITE v7.1.2 ready in 280 ms` indica que el servidor de desarrollo de Vite se levantó correctamente y el tiempo que demoró en iniciar.

`Local: http://localhost:5173/` corresponde a la url local donde se puede acceder a la aplicación desde el navegador.