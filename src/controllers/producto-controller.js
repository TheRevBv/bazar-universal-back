// Require the Product model
import Producto from "../models/Producto.js";

// Define the controller object
class ProductoController {
  // @desc    Get all products
  // @route   GET /api/productos
  async getProductos(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const productos = await Producto.find().skip(skip).limit(limit);

      const total = await Producto.countDocuments();

      res.json({
        productos,
        total,
        skip,
        limit,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
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

  // @desc    Create multiple products
  // @route   POST /api/productos/bulk
  // @access  Public
  async createProductos(req, res) {
    try {
      const productos = req.body; // asume que recibes un array de productos en el cuerpo de la solicitud
      const nuevosProductos = await Producto.create(productos);
      res.status(201).json(nuevosProductos);
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };

      const productos = await Producto.find(query).skip(skip).limit(limit);

      const total = await Producto.countDocuments(query);

      res.json({
        productos,
        total,
        skip,
        limit,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default ProductoController;
