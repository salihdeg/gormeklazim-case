import { Result } from "../utils/types/result";
import { ICategory } from "../models/abstract/category.interface";
import { CategoryRepository } from "../repositories/concrete/category.repository";
import { generateSlug } from "../utils/slugify";
import { HTTPStatusCode } from "../utils/types/httpStatusCode.enum";
import { CustomError } from "../utils/types/customError";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    // private categoryRepository: CategoryRepository;

    // constructor(categoryRepository: CategoryRepository){
    //     this.categoryRepository = categoryRepository;
    // }

    async getAll() {
        const data = await categoryRepository.getAll();
        return new Result(data, "Categories fetched successfully", HTTPStatusCode.Ok);
    }

    async getById(id: string) {
        this.checkIfIdNotValid(id);

        const category = await categoryRepository.getById(id);
        await this.CheckIfCategoryNotExist(id);

        return new Result(category, "Category fetched successfully", HTTPStatusCode.Ok);
    }

    async create(data: ICategory) {
        data.url = generateSlug(data.categoryName);

        await this.CheckIfCategoryExist(data);

        const createdCategory = await categoryRepository.create(data);

        return new Result(createdCategory, "Category created successfully", HTTPStatusCode.Created);
    }

    async update(id: string, data: any) {
        this.checkIfIdNotValid(id);
        data.url = generateSlug(data.categoryName);
        const updatedCategory = await categoryRepository.update(id, data);
        return new Result(updatedCategory, "Category updated successfully", HTTPStatusCode.Ok);
    }

    async delete(id: string) {
        this.checkIfIdNotValid(id);
        await this.CheckIfCategoryNotExist(id);

        const category = await categoryRepository.delete(id);
        return new Result(category, "Category deleted successfully", HTTPStatusCode.MovedPermanently);
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
            search = { categoryName: { $regex: tempStr, $options: 'i' } }
        } else {
            search = { categoryName: { $regex: '.*' + conditions + '.*', $options: 'i' } }
        }

        const result = await categoryRepository.find(search);

        return new Result(result, "Categories fetched successfully", HTTPStatusCode.Ok);
    }

    async findByUrl(url: string) {
        const category = await categoryRepository.findByUrl(url);
        if (!category) {
            throw new CustomError("Category not found", HTTPStatusCode.NotFound);
        }

        return new Result(category, "Category fetched successfully", HTTPStatusCode.Ok);
    }

    // BUSINESS LOGIC
    private async CheckIfCategoryExist(data: ICategory) {
        const category = await categoryRepository.findByUrl(data.url);
        console.log(category);
        if (category) {
            throw new CustomError("Category already exists", HTTPStatusCode.BadRequest);
        }
    }

    private async CheckIfCategoryNotExist(id: string) {
        const product = await categoryRepository.getById(id);
        if (!product) {
            throw new CustomError("Category not found", HTTPStatusCode.NotFound);
        }
    }

    private checkIfIdNotValid(id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new CustomError("Invalid id", HTTPStatusCode.BadRequest);
        }
    }
}