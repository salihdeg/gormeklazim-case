import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/gormeklazim_case", {
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};