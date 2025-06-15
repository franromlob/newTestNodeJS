// Importamos el módulo de 'Express'
const express = require("express");

// Declaramos un puerto
const PORT = 3000;

// Así inicializamos 'express' y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

// Analizamos los archivos JSON
app.use(express.json());

const users = require("./router/userRoutes");

// Ésto son 'endpoint' -- '/users'
app.use("/users", users);

// Levanta el servidor -- De esta forma se inicializa
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
