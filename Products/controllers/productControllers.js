const productModel = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(202).json({
      status: "succeeded",
      data: products,
      message: "Productos obtenidos con éxito",
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// PUT crear un producto con todos los campos especificados
const createProduct = async (req, res) => {
  try {
    const { name, price, description, size, colors, brand } = req.body;

    if (!name || !price || !description) {
      return res
        .status(404)
        .json({ status: "not_found", message: "Faltan datos requeridos" });
    }

    const newProduct = new productModel({
      name,
      price,
      description,
      size,
      colors,
      brand,
    });

    // Guarda el nuevo producto en la base de datos y espera hasta que esté guardado,
    // luego guarda el resultado en 'savedProduct'

    const savedProduct = await newProduct.save();

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
    productById = await productModel.findById(idProduct);

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
    // const updates = { name, price, description, sizes, colors, brand };
    // Object.keys(updates).forEach((key) => {
    //   if (updates[key] !== undefined) {
    //     product[key] = updates[key];
    //   }
    // });

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (description) {
      product.description = description;
    }

    if (sizes) {
      product.sizes = sizes;
    }

    if (colors) {
      product.colors = colors;
    }

    if (brand) {
      product.brand = brand;
    }

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

module.exports = { getProducts, createProduct, readProductById, updateProduct };
