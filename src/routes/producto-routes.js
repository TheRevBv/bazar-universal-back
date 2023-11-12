import { Router } from "express";
import ProductoController from "../controllers/producto-controller.js";

class ProductoRouter {
  constructor() {
    this.router = Router();
    this.productoController = new ProductoController();
    this.initializeRoutes();
    console.log("ProductoRouter initialized");
  }

  initializeRoutes() {
    this.router.get("/search", this.productoController.searchProductos); // Cambié la ruta aquí
    this.router.get("/", this.productoController.getProductos);
    this.router.get("/:id", this.productoController.getProducto);
    this.router.post("/", this.productoController.createProducto);
    this.router.post("/bulk", this.productoController.createProductos);
    this.router.put("/:id", this.productoController.updateProducto);
    this.router.delete("/:id", this.productoController.deleteProducto);
  }

  getRouter() {
    return this.router;
  }
}

export default ProductoRouter;
