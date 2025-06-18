// La idea Principal es traernos los EndPoint aquí
// para desacoplar la lógica del EndPoint

const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
} = require("../controllers/usersControllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

// router.patch("/:id", updateById);

router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
