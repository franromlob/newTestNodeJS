const productModel = require("../models/productModel");

// GET '/products' - Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      status: "success",
      data: products,
      message: "Productos obtenidos con éxito",
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// POST '/products' - Crear un producto con todos los campos especificados
const createProduct = async (req, res) => {
  try {
    const { name, price, description, size, colors, brand } = req.body;

    if (!name || !price || !description) {
      return res
        .status(400)
        .json({ status: "not_found", message: "Faltan datos requeridos" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        status: "fail",
        message: "Precio debe ser un número positivo",
      });
    }

    const newProduct = new productModel.create({
      name,
      price,
      description,
      sizes: sizes || [],
      colors: colors || [],
      brand: brand || "Sin marca",
    });

    res.status(201).json({
      status: "created",
      data: savedProduct,
      message: "Producto creado con éxito",
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// GET_id  'Leer producto', obtiene información de un producto
// específico por su identificador
const readProductById = async (req, res) => {
  const { idProduct } = req.params;

  try {
    const productById = await productModel.findById(idProduct);

    if (productById) {
      res.status(200).json({
        status: "succeed",
        data: productById,
        message: "Producto leído",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// PATCH 'Actualizar Producto', Permitir la modificación de los campos de un producto existente
const updateProduct = async (req, res) => {
  const { name, price, description, sizes, colors, brand } = req.body;
  const { idProduct } = req.params.idProduct;

  try {
    // Validar si el ID es válido (opcional pero recomendado)
    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({
        status: "failed",
        message: "ID de producto no válido",
      });
    }

    // Buscar el producto
    const product = await productModel.findById(idProduct);

    if (!product) {
      return res
        .status(404)
        .send({ status: "failed", message: "No existe el producto!!" });
    }

    // Actualizar solo los campos proporcionados en req.body
    const updates = { name, price, description, sizes, colors, brand }; // Objeto con posibles actualizaciones

    Object.keys(updates) // ["name", "price", ...]
      .forEach((key) => {
        // Solo actualiza si el valor existe (no es undefined)
        if (updates[key] !== undefined) product[key] = updates[key];
      });

    // if (name) {
    //   product.name = name;
    // }

    // if (price) {
    //   product.price = price;
    // }

    // if (description) {
    //   product.description = description;
    // }

    // if (sizes) {
    //   product.sizes = sizes;
    // }

    // if (colors) {
    //   product.colors = colors;
    // }

    // if (brand) {
    //   product.brand = brand;
    // }

    // Guardar cambios (con await)
    await product.save();

    res.status(200).json({
      status: "succeeded",
      data: product,
      message: "Producto actualizado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

// DELETE 'Eliminar Producto', capacidad para eliminar un producto del sistema por su identificador
const deleteProduct = async (req, res) => {
  // 1. Obtener el ID del producto de los parámetros de la ruta
  const { idProduct } = req.params;

  // 2. Validar que el ID exista
  if (!idProduct) {
    return res
      .status(400)
      .json({ status: "failed", message: "Se requiere el ID del producto" });
  }

  try {
    // 3. Buscar y eliminar el producto usando Mongoose
    const deletedProduct = await productModel.findByIdAndDelete(idProduct);

    // 4. Verificar si se encontró y eliminó el producto
    if (!deletedProduct) {
      return res.status(404).json({
        status: "failed",
        message: "Producto no encontrado",
      });
    }

    // 5. Responder con éxito
    res.status(200).json({
      status: "success",
      data: deletedProduct,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    // 6. Manejar errores
    res.status(500).json({
      status: "failed",
      error: error.message,
      message: "Error al eliminar el producto.",
    });
  }
};

// GET '/products/average' -  Obtiene la media de precios de todos los productos
const averageProduct = async (req, res) => {
  try {
    // 1. Obtener todos los productos de la base de datos
    const products = await productModel.find({}, "price"); // Sólo obtenemos el campo 'price'

    // 2. Validar que hay productos
    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se encontraron productos",
      });
    }

    // 3. Calcular la suma de productos
    const sumPrices = products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);

    // let sumPrices = 0;
    // for (i = 0; i < prices.length; i++) {
    //    sumPrices += prices[i];
    // }

    // 4. Calcular la media
    const averagePrice = sumPrices / products.length;

    // 5. Responder con formato JSON
    res.status(200).json({
      status: "success",
      data: {
        average: averagePrice,
        totalProducts: products.length,
        sumPrices: sumPrices,
      },
      message: `La media de precios es ${averagePrice.toFixed(2)}`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      message: "Error al calcular la media de precios",
    });
  }

  res.send(`La media de precios es ${averagePrices}`);
};

module.exports = {
  getProducts,
  createProduct,
  readProductById,
  updateProduct,
  deleteProduct,
};
