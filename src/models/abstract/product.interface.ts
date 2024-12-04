import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
    productName: string;
    barcode: string;
    stock: number;
    price: number;
    description: string;
    url: string;
    category: ObjectId;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
}