const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  readProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

// ⚠️ ORDEN IMPORTANTE: Rutas generales primero, específicas después
router.get("/", getProducts);
router.post("/", createProduct);

// Rutas específicas con ID
router.get("/:id", readProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
