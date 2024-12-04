import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CustomError } from "../utils/types/customError";
import { HTTPStatusCode } from "../utils/types/httpStatusCode.enum";

const productService = new ProductService();

export class ProductController {

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const products = await productService.getAll();
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getAllPaginated(req: Request, res: Response): Promise<any> {
        const { page, limit } = req.query;
        try {
            const products = await productService.getAllPaginated(parseInt(page as string), parseInt(limit as string));
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const product = await productService.getById(id);
            return res.status(HTTPStatusCode.Ok).json(product);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const product = await productService.create(req.body);
            return res.status(HTTPStatusCode.Created).json(product);
        } catch (error: any) {
            return res.status(HTTPStatusCode.BadRequest).json({ message: error.message, code: res.statusCode });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const updatedProduct = await productService.update(req.params.id, req.body);
            return res.status(HTTPStatusCode.Created).json(updatedProduct);
        } catch (error: any) {
            return res.status(HTTPStatusCode.BadRequest).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            await productService.delete(id);
            return res.status(HTTPStatusCode.MovedPermanently).json({ message: 'Product deleted successfully' });
        } catch (error: any) {
            return res.status(HTTPStatusCode.BadRequest).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response): Promise<any> {
        try {
            const products = await productService.find(req.query.term);
            return res.status(HTTPStatusCode.Ok).json(products);
        } catch (error: any) {
            return res.status(HTTPStatusCode.BadRequest).json({ message: error.message });
        }
    }

    async findByUrl(req: Request, res: Response): Promise<any> {
        try {
            const product = await productService.findByUrl(req.params.url);
            return res.status(HTTPStatusCode.Ok).json(product);
        } catch (error: any) {
            return res.status(HTTPStatusCode.BadRequest).json({ message: error.message });
        }
    }

}