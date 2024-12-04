import mongoose, { Schema } from "mongoose";
import { ICategory } from "../abstract/category.interface";

const CategorySchema: Schema = new Schema(
    {
        categoryName: { type: String, required: true, unique: true, trim: true },
        url: { type: String, required: true, unique: true, trim: true },
    },
    { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);