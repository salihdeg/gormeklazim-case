import { IProduct } from '../../models/abstract/product.interface'
import { IProductRepository } from './../abstract/product-repository.interface';
import { Product } from '../../models/concrete/product.model';

export class ProductRepository implements IProductRepository {

    async getAll(): Promise<IProduct[]> {
        return Product.find();
    }
    async getById(id: string): Promise<IProduct | null> {
        return Product.findById(id).findOne();
    }
    async create(data: IProduct): Promise<IProduct> {
        return Product.create(data);
    }
    async update(id: string, data: IProduct): Promise<IProduct | null> {
        return Product.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string): Promise<IProduct | null> {
        return Product.findByIdAndDelete(id);
    }
    async find(conditions: any): Promise<IProduct[] | null> {
        return Product.find(conditions);
    }
    async findByUrl(url: string): Promise<IProduct | null> {
        return Product.find({url: url}).findOne();
    }
    async getAllPaginated(page: number, limit: number): Promise<IProduct[] | null> {
        return Product.find().skip((page - 1) * limit).limit(limit);
    }
    async count(): Promise<number> {
        return Product.countDocuments();
    }

}