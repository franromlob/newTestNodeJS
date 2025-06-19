const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  getNumUsers,
  patchById,
  addUser,
  deleteUser,
} = require("../controllers/usersControllers");

// ⚠️ ORDEN IMPORTANTE: Rutas específicas PRIMERO
router.patch("/:id", patchById);
router.post("/", addUser);
router.delete("/", deleteUser);
router.get("/num_users", getNumUsers); // PRIMERA
router.get("/", getUsers);
router.get("/:id", getUserById); // DESPUÉS de las específicas

module.exports = router;
