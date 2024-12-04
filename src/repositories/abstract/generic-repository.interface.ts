import { Document } from "mongoose";

export interface GenericRepository<T extends Document> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    find(conditions: any): Promise<T[] | null>;
}