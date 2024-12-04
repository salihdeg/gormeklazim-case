import { CustomError } from "../utils/types/customError";
import { IProduct } from "../models/abstract/product.interface";
import { ProductRepository } from "../repositories/concrete/product.repository";
import { generateSlug } from "../utils/slugify";
import { HTTPStatusCode } from "../utils/types/httpStatusCode.enum";
import { Result } from "../utils/types/result";

const productRepository = new ProductRepository();

export class ProductService {

    async getAll() {
        const data = await productRepository.getAll();
        return new Result(data, "Products fetched successfully", HTTPStatusCode.Ok);
    }

    async getById(id: string) {
        this.checkIfIdNotValid(id);

        const product = await productRepository.getById(id);
        await this.CheckIfProductNotExist(id);

        return new Result(product, "Product fetched successfully", HTTPStatusCode.Ok);
    }

    async create(data: IProduct) {
        data.url = generateSlug(data.productName + "-" + data.barcode);

        await this.CheckIfProductExist(data);

        const createdProduct = await productRepository.create(data);

        return new Result(createdProduct, "Product created successfully", HTTPStatusCode.Created);
    }

    async update(id: string, data: IProduct) {
        +
        this.checkIfIdNotValid(id);
        data.url = generateSlug(data.productName + "-" + data.barcode);

        const updatedProduct = await productRepository.update(id, data);
        return new Result(updatedProduct, "Product updated successfully", HTTPStatusCode.Ok);
    }

    async delete(id: string) {
        this.checkIfIdNotValid(id);
        await this.CheckIfProductNotExist(id);

        const product = await productRepository.delete(id);
        return new Result(product, "Product deleted successfully", HTTPStatusCode.MovedPermanently);
    }

    async find(conditions: any) {
        const termArr = conditions.split(' ');
        let tempStr = '';

        for (let i = 0; i < termArr.length; i++) {
            tempStr += '.*' + termArr[i] + '.*';
            if (i < termArr.length - 1) {
                tempStr += '?';
            }
        }

        let search = {};
        if (termArr.length > 1) {
            search = { productName: { $regex: tempStr, $options: 'i' } }
        } else {
            search = { productName: { $regex: '.*' + conditions + '.*', $options: 'i' } }
        }

        const result = await productRepository.find(search);
        return new Result(result, "Products fetched successfully", HTTPStatusCode.Ok);
    }

    async findByUrl(url: string) {
        const product = await productRepository.findByUrl(url);
        if (!product) {
            throw new CustomError("Product not found", HTTPStatusCode.NotFound);
        }

        product.viewCount += 1;
        await product.save();
        return new Result(product, "Product fetched successfully", HTTPStatusCode.Ok);
    }

    async getAllPaginated(page: number, limit: number) {
        const total = await productRepository.count();
        if (total === 0) {
            throw new CustomError("Products not found", HTTPStatusCode.NotFound);
        }

        const products = await productRepository.getAllPaginated(page, limit);
        const totalPages = Math.ceil(total / limit);
        const data = { data: products, meta: { total: total, totalPage: totalPages, currentPage: page, productPerPage: limit } };
        return new Result(data, "Products fetched successfully", HTTPStatusCode.Ok);
    }

    // BUSINESS LOGIC
    private async CheckIfProductExist(data: IProduct) {
        const product = await productRepository.findByUrl(data.url);
        if (product) {
            throw new CustomError("Product already exists", HTTPStatusCode.BadRequest);
        }
    }

    private async CheckIfProductNotExist(id: string) {
        const product = await productRepository.getById(id);
        if (!product) {
            throw new CustomError("Product not found", HTTPStatusCode.NotFound);
        }
    }

    private checkIfIdNotValid(id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new CustomError("Invalid id", HTTPStatusCode.BadRequest);
        }
    }

}