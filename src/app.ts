import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import categoryRoute from "./routes/category.route";
import productRoute from "./routes/product.route";
import { connectDatabase } from "./config/database";
//import "express-async-errors";

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

// DB Connection
connectDatabase();

// Routes
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("OK");
});

export default app;
