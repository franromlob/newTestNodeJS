const router = require("express").Router();

// Base de Datos tipo 'JSON'
let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// const router = express.Router();

// Método 'get' para obtener toda la collection users
router.get("/", (req, res) => {
  res.send(USERS);
});

// Método 'get' para obtener un único usuario
router.get("/:id", (req, res) => {
  // Convertimos el id de URL en un entero
  const id = parseInt(req.params.id);

  // Buscamos en el Array por el valor que queremos buscar, en este caso por 'id'
  const user = USERS.find((user) => user.id === id);

  res.send(user.name);
});

// Método 'update' para actualizar usuario
router.patch("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  // Buscamos en el array por el valor que queremos buscar, en este caso por id
  const user = USERS.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "El usuariono existe." });
  }

  // Actualizar sólo los campos enviados
  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  res.send(user);

  res.json({
    name: name,
    email: email,
  });
});

router.put("/:id", (req, res) => {
  res.send(`Soy 'put' ${req.params.id}`);
});

// DELETE user por ID
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const originalLength = USERS.length;

  const filteredUsers = USERS.filter((user) => user.id !== userId);

  // Verificar si se eliminó algo
  if (filteredUsers.length === originalLength) {
    return res.status(404).json({ message: "El usuario no existe" });
  }

  // Actualizar el array y responder
  USERS = filteredUsers;
  res.json({
    message: `Usuario ${userId} eliminado exitosamente`,
    id: userId,
    remainingUsers: filteredUsers,
  });
});

// DELETE User by ID
// router.delete("/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   // Encontrar el Índice
//   const userIndex = USERS.findIndex((user) => user.id === id);

//   // Validar si existe
//   if (userIndex === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Usuario No Encontrado",
//     });
//   }

//   // ELIMINAR del array (splice devuelve un array con el elemento eliminado)
//   const deletedUser = USERS.splice(userIndex, 1);

//   res.json({
//     success: true,
//     message: `Usuario ${deletedUser.name} eliminado exitosamente`,
//     deletedUser: deletedUser,
//   });
// });

module.exports = router;
