import mongoose, { Schema } from "mongoose";
import { IProduct } from "../abstract/product.interface";

const ProductSchema: Schema = new Schema(
    {
        productName: { type: String, required: true, trim: true },
        barcode: { type: String, required: true, unique: true, trim: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true, trim: true },
        url: { type: String, required: true, unique: true, trim: true },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        viewCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);