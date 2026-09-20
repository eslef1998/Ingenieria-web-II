# IUD Media Stream - Gestión de Producciones Multimediales

Proyecto final para la asignatura de Ingeniería Web II. Consiste en una solución full-stack desarrollada bajo la arquitectura MERN (MongoDB, Express, React, Node.js) y desplegada completamente en la nube (Cloud Hosting). El sistema permite gestionar un catálogo de películas y series, relacionando entidades clave de la industria audiovisual.

## Autor
* **Leandro Marín Parra** - Tecnología en Desarrollo de Software

## Entornos de Producción (Cloud)
La aplicación se encuentra desplegada bajo una arquitectura cliente-servidor fuertemente desacoplada. Accesos oficiales:

* **Aplicación Cliente (Frontend SPA):** https://loquacious-sfogliatella-5da74f.netlify.app
* **API RESTful (Backend):** https://ingenieria-web-ii.onrender.com
* **Base de Datos:** Clúster NoSQL en MongoDB Atlas

## Módulos del Sistema
El proyecto cuenta con 5 módulos core (CRUD) completamente funcionales e integrados:
* **Catálogo Media:** Gestión principal de las obras multimedia.
* **Géneros:** Clasificación de los contenidos.
* **Directores:** Registro de los realizadores.
* **Productoras:** Entidades dueñas de los derechos de producción.
* **Tipos:** Formatos de los contenidos (Ej. Película, Serie).

## Tecnologías Utilizadas

**Backend (API REST)**
* **Node.js & Express.js:** Servidor backend y enrutamiento con CORS habilitado.
* **MongoDB & Mongoose:** Base de datos NoSQL y esquemas relacionales.
* **Dotenv:** Gestión de variables de entorno.
* **Nodemon:** Entorno de desarrollo.

**Frontend (Interfaz de Usuario)**
* **React.js:** Interfaz de usuario dinámica (SPA).
* **Consumo API:** Peticiones HTTP asíncronas en formato JSON.

## Estructura del Proyecto
El código del servidor está organizado bajo la arquitectura MVC dentro de la carpeta `src/`:

* `config/`: Conexión a la base de datos MongoDB.
* `models/`: Esquemas de Mongoose con relaciones mediante `ObjectId`.
* `controllers/`: Lógica de negocio, controladores y validaciones.
* `routes/`: Definición de endpoints para cada recurso.

## Instalación y Ejecución

```bash
1. Clonar el repositorio:
git clone [https://github.com/eslef1998/Ingenieria-web-II.git](https://github.com/eslef1998/Ingenieria-web-II.git)

2. Instalar dependencias:
npm install

3. Configurar variables de entorno:
# Crear un archivo .env en la raíz del proyecto y agregar:
PORT=4000
MONGO_URI=tu_cadena_de_conexion_a_mongodb_atlas

4. Iniciar el servidor:
npm run dev