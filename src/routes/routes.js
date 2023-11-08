import ProductoRouter from "./producto-routes.js";

const productoRouter = new ProductoRouter();
const router = productoRouter.getRouter();

export default router;
