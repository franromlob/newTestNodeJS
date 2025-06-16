// Importamos el módulo de 'Express'
const express = require("express");

// Importamos Mongo
const mongoose = require("mongoose");

// Con éste fichero tendríamos acceso a los datos del archivo
require("dotenv").config();

// Declaramos un puerto
const PORT = 3000;

// Así inicializamos 'express' y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

// Analizamos los archivos JSON
app.use(express.json());

const url_mongo = process.env.DATABASE_URL_DEV;

/** 🧠 Pseudocódigo Detallado
1. Declarar URL de conexión a MongoDB
2. sar mongoose.connect() para iniciar la conexión
3. Obtener el objeto de conexión mongoose.connection
4. Registrar manejadores de eventos para:
    4.1 Error
    4.2 Conexión exitosa
    4.3 Desconexión */

// Hacemos la conexión con MongoDb
// Estamos cogiendo el servidor de mongo e indicarle la bbdd que vamos a usar

// Iniciar la conexión
mongoose.connect(url_mongo);
// Obtener el objeto de conexión
const db = mongoose.connection;

// Registrar manejadores de eventos para: 1. Error 2. Conexión exitosa 3. Desconexión.

// Si ocurre un error (como MongoDB no esté encendido), se imprimirá en consola
db.on("error", (error) => {
  console.error(`❌ Error al conectar con MongoDB: ${error}`);
});

// Este evento se dispara cuando Mongoose se conecta exitosamente
db.on("connected", () => {
  console.log(`✅ Conexión exitosa a MongoDB`);
});

// Este evento se dispara cuando Mongoose esté desconectado
db.on("disconnected", () => {
  console.warn("⚠️ Se ha desconectado MongoDB");
});

const users = require("./router/userRoutes");

// Ésto son 'endpoint' -- '/users'
app.use("/users", users);

// Levanta el servidor -- De esta forma se inicializa
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
