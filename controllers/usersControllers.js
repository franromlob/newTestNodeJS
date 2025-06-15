// Base de Datos tipo 'JSON'
let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// const router = express.Router();

// Método 'get' para obtener toda la collection users
// router.get("/", (req, res) => {
//   res.send(USERS);
// });

// Crea la función 'getUsers' para luego exportarla a 'userRoutes.js'
const getUsers = (req, res) => {
  res.send(USERS);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = USERS.find((user) => user.id === id);

  if (user.id === -1) {
    return "El ususario no existe";
  }

  res.send(user);
};

// Añade usuario con POST
const addUser = (req, res) => {
  const { name, email } = req.body;

  const newIndex = USERS.length + 1;

  const newUser = {
    id: newIndex,
    name: name,
    email: email,
  };

  console.log(newUser);
  console.log(newIndex);

  // Lo añadimos al Array
  USERS.push(newUser);

  res.send(newUser);
};

// DELETE usuario
const deleteUser = (req, res) => {
  const idUser = parseInt(req.params.id);

  if (!idUser) {
    return res.status(404).json({
      message: `El usuario con id ${idUser} no existe`,
    });
  }

  const users = USERS.filter((user) => user.id !== idUser);

  console.log(users);

  return res.send(users);
};

module.exports = { getUsers, getUserById, addUser, deleteUser };

// const updateById = (req, res) => {
//   const idUser = parseInt(req.params.id);

//   const user = USERS.find((user) => user.id === idUser);

//   const { name, email } = user.body;

//   if (idUser === -1) {
//     return res.status(404).json({ message: "El usuario no existe" });
//   }

//   // Actualizamos el usuario, en este caso 'name' & 'email'

//   if (name) {
//     user.name = name;
//   }

//   if (email) {
//     user.email = email;
//   }

//   res.send(user);
// };

// const putById = (req, res) => {
//   const idUser = parseInt(req.params.id);

//   const { name, email } = req.body;

//   const userId = USERS.findIndex((user) => user.id === idUser);

//   if (userId === -1) {
//     return res.status(404).json({
//       message: `El usuario con ID ${idUser} no existe`,
//     });
//   }

//   // Reemplaza los datos del Usuario
//   USERS[userId] = { id: idUser, name, email };

//   return res.status(200).json(USERS[userId]);
// };

// // Método 'get' para obtener un único usuario
// router.get("/:id", (req, res) => {
//   // Convertimos el id de URL en un entero
//   const id = parseInt(req.params.id);

//   // Buscamos en el Array por el valor que queremos buscar, en este caso por 'id'
//   const user = USERS.find((user) => user.id === id);

//   res.send(user.name);
// });

// // Método 'update' para actualizar usuario
// router.patch("/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const { name, email } = req.body;

//   // Buscamos en el array por el valor que queremos buscar, en este caso por id
//   const user = USERS.find((user) => user.id === userId);

//   if (!user) {
//     return res.status(404).json({ message: "El usuario no existe." });
//   }

//   // Actualizar sólo los campos enviados
//   if (name) {
//     user.name = name;
//   }

//   if (email) {
//     user.email = email;
//   }

//   res.send(user);

//   res.json({
//     name: name,
//     email: email,
//   });
// });

// router.put("/:id", (req, res) => {
//   res.send(`Soy 'put' ${req.params.id}`);
// });

// // DELETE user por ID
// router.delete("/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const originalLength = USERS.length;

//   const filteredUsers = USERS.filter((user) => user.id !== userId);

//   // Verificar si se eliminó algo
//   if (filteredUsers.length === originalLength) {
//     return res.status(404).json({ message: "El usuario no existe" });
//   }

//   // Actualizar el array y responder
//   USERS = filteredUsers;
//   res.json({
//     message: `Usuario ${userId} eliminado exitosamente`,
//     id: userId,
//     remainingUsers: filteredUsers,
//   });
// });

// // DELETE User by ID
// // router.delete("/:id", (req, res) => {
// //   const id = parseInt(req.params.id);

// //   // Encontrar el Índice
// //   const userIndex = USERS.findIndex((user) => user.id === id);

// //   // Validar si existe
// //   if (userIndex === -1) {
// //     return res.status(404).json({
// //       success: false,
// //       message: "Usuario No Encontrado",
// //     });
// //   }

// //   // ELIMINAR del array (splice devuelve un array con el elemento eliminado)
// //   const deletedUser = USERS.splice(userIndex, 1);

// //   res.json({
// //     success: true,
// //     message: `Usuario ${deletedUser.name} eliminado exitosamente`,
// //     deletedUser: deletedUser,
// //   });
// // });
