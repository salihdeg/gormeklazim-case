import { Request, Response } from 'express';
import { CategoryService } from './../services/category.service';
// import { categoryService } from 'src/container/dependency-container';

const categoryService = new CategoryService();

export class CategoryController {
    // private categoryService: CategoryService;

    // constructor(categoryService: CategoryService) {
    //     this.categoryService = categoryService;
    // }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const categories = await categoryService.getAll();
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const category = await categoryService.getById(id);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const category = await categoryService.create(req.body);
            return res.status(201).json(category);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const updatedCategory = await categoryService.update(req.params.id, req.body);
            return res.status(201).json(updatedCategory);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const category = await categoryService.delete(req.params.id);
            return res.status(410).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response): Promise<any> {
        try {
            const categories = await categoryService.find(req.query);
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findByUrl(req: Request, res: Response): Promise<any> {
        const { url } = req.params;
        try {
            const category = await categoryService.findByUrl(url);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

}