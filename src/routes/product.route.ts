import { ProductController } from "../controllers/product.controller";
import { Router } from "express";

const router: Router = Router();
const productController = new ProductController();

// SOR
// router.get("/", categoryController.find);
router.get("/", productController.getAll);
router.get("/page", productController.getAllPaginated);
router.get("/search", productController.find);
router.get("/:id", productController.getById);
router.get("/url/:url", productController.findByUrl);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;