import { IProduct } from "models/abstract/product.interface";
import { GenericRepository } from "./generic-repository.interface";

export interface IProductRepository extends GenericRepository<IProduct> {

    findByUrl(url: string): Promise<IProduct | null>;

    getAllPaginated(page: number, limit: number): Promise<IProduct[] | null>;

}