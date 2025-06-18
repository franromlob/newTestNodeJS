//Importas Mongoose, que es la librería para conectar con MongoDB
const mongoose = require("mongoose");

// Tomas el constructor 'Schema' para definir la estructura del documento (parecido a una tabla si vienes de SQL).
const Schema = mongoose.Schema;

// Define un esquema par un documento 'User', tiene 2 campos: name, email.
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Crea un modelo llamado 'User', basado en el esquema anterior. Esto conecta el nombre
// del modelo con una colección en MongoDB llamada 'users'
const user = mongoose.model("User", userSchema, "User");
// mongoose.model("<Nombre del modelo>", <Esquema>, <Nombre de colección>);

// Exporta el modelo para poder usarlo en tus controladores
module.exports = user;
