// Require the Product model
import Producto from "../models/Producto.js";

// Define the controller object
class ProductoController {
  // @desc    Get all products
  // @route   GET /api/productos
  async getProductos(req, res) {
    try {
      const productos = await Producto.find();
      res.json({
        productos: productos,
        total: productos.length,
        skip: 0,
        limit: 10,
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // @desc    Get single product
  // @route   GET /api/productos/:id
  async getProducto(req, res) {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: `Server error ${error}` });
    }
  }

  // @desc    Create a product
  // @route   POST /api/productos
  async createProducto(req, res) {
    try {
      const producto = await Producto.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // @desc    Update a product
  // @route   PUT /api/productos/:id
  async updateProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!producto) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // @desc    Delete a product
  // @route   DELETE /api/productos/:id
  async deleteProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product removed" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // @desc    Search products
  // @route   GET /api/productos
  async searchProductos(req, res) {
    try {
      const { search } = req.query;
      const productos = await Producto.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default ProductoController;
