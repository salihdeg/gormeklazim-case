import { Router } from 'express';
import { CategoryController } from './../controllers/category.controller';
// import { categoryController } from 'src/container/dependency-container';

const router: Router = Router();

const categoryController = new CategoryController();

// SOR
// router.get('/', categoryController.find);
router.get('/', categoryController.getAll);
router.get('/search', categoryController.find);
router.get('/url/:url', categoryController.findByUrl);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;