import { ICategory } from "../../models/abstract/category.interface";
import { ICategoryRepository } from "../abstract/category-repository.interface";
import { Category } from "../../models/concrete/category.model";

export class CategoryRepository implements ICategoryRepository {

    async getAll(): Promise<ICategory[]> {
        return Category.find();
    }
    async getById(id: string): Promise<ICategory | null> {
        return Category.findById(id);
    }
    async create(data: ICategory): Promise<ICategory> {
        return Category.create(data);
    }
    async update(id: string, data: ICategory): Promise<ICategory | null> {
        return Category.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string): Promise<ICategory | null> {
        return Category.findByIdAndDelete(id);
    }
    async find(conditions: any): Promise<ICategory[] | null> {
        return Category.find(conditions);
    }
    async findByUrl(url: string): Promise<ICategory | null> {
        return Category.findOne({ url: url }).findOne();
    }

}