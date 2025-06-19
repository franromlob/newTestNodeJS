const userModel = require("../models/userModels");

// Base de Datos tipo 'JSON'
let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// const router = express.Router();

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find(); // Busca todos los usuarios en la bbdd
    res.status(200).json({ status: "succeeded", data: users, error: null }); // ✅ Corregido: 'users' en lugar de 'data'
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

// Crea la función 'getUsers' para luego exportarla a 'userRoutes.js'
// const getUsers = (req, res) => {
//   res.send(USERS);
// };

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      // ✅ Corregido: Movido dentro del try
      return res
        .status(404) // ✅ Corregido: 404 en lugar de 500
        .json({ status: "failed", data: null, error: "Usuario no encontrado" });
    }

    res.status(200).json({ status: "succeeded", data: user, error: null });
    /** {
      status: "succeeded",  // Indica el estado de la operación
      data: user,           // Contiene los datos del usuario solicitado
      error: null           // Indica que no hubo errores (podría ser un objeto de error si falla)
    }
    */
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// EndPoint para ver el número de usuarios que existen en la bbdd
const getNumUsers = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    console.log(`Total de usuarios: ${userCount}`);
    res.json({
      success: true,
      totalUsers: userCount,
    });
  } catch (error) {
    console.error("Error al contar usuarios:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al contar usuarios",
      error: error.message,
    });
  }
};

// Método 'patch' implementar operaciones de 'actualización parcial'
const patchById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Obtiene el nuevo nombre y correo electrónico del usuario
    const { name, email } = req.body;

    // Busca un usuario por su ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        // ✅ Corregido: 404 en lugar de 400
        status: "failed",
        data: null,
        error: "El usuario no existe",
      });
    }

    if (name) {
      // Actualiza el nombre del usuario si se proporciona uno nuevo
      user.name = name;
    }

    if (email) {
      // Actualiza el email del usuario si se proporciona uno nuevo
      user.email = email;
    }

    // Guarda los cambios en la bbdd
    await user.save();
    res.status(200).json({ status: "succeeded", data: user, error: null }); // ✅ Corregido: 'user' en lugar de 'data'
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // ✅ Corregido: .json() en lugar de .send()
  }
};

// Añadir un Usuario con POST
const addUser = async (req, res) => {
  try {
    // Obtiene el nombre y correo electrónico del nuevo usuario
    const { name, email } = req.body;

    // Crea un nuevo usuario con los datos proporcionados
    const newUser = new userModel({ name, email });

    // Guarda el nuevo usuario en la BBDD
    await newUser.save();

    res.status(201).json({
      // ✅ Corregido: 201 para creación exitosa
      status: "succeeded", // ✅ Corregido: "succeeded" en lugar de "succeed"
      data: newUser,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// Eliminar usuario con DELETE
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: "failed",
        message: "Usuario no encontrado",
      });
    }

    // ✅ Corregido: Eliminada línea problemática con .filter() en userModel
    res.status(200).json({
      status: "succeeded", // ✅ Corregido: "succeeded" en lugar de "succeed"
      data: deletedUser,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getNumUsers,
  patchById,
  addUser,
  deleteUser,
};
