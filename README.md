# Ingenieria-web-II-API-REST---NodeJs
# API REST - Gestión de Películas y Series

Proyecto backend para la asignatura de Ingeniería Web II. Consiste en una API REST que permite gestionar la información de películas y series , relacionando entidades como directores, géneros, productoras y tipos de contenidos.

## Autor
* **Leandro Marín Parra** - Tecnología en Desarrollo de Software

## Tecnologías Utilizadas
* **Node.js**  (Servidor backend y rutas)
* **MongoDB** y **Mongoose** (Base de datos NoSQL y esquemas relacionales)
* **Dotenv** (Variables de entorno)
* **Nodemon** (Entorno de desarrollo)

## Estructura del Proyecto
El código está organizado bajo la arquitectura MVC dentro de la carpeta `src/`:

* `config/`: Conexión a la base de datos MongoDB.
* `models/`: Esquemas de Mongoose con relaciones mediante `ObjectId`.
* `controllers/`: Lógica de negocio, controladores y validaciones.
* `routes/`: Definición de endpoints para cada recurso.

## Instalación y Ejecución
```bash
1. Clonar el repositorio:
git clone https://github.com/eslef1998/Ingenieria-web-II-API-REST---NodeJs

2. instalar dependeicnais 
npm install

3. iniciar el servidor 
npm run dev
