import express from "express";
import cors from "cors";
import "express-async-errors";
import compression from "compression";
import { config } from "dotenv";
import { createServer } from "http";

import { errorHandler } from "./middlewares/error-handler.js";
import { connectDB } from "./db/connection.js";
import { CustomError } from "./lib/custom-error.js";
import { productsRouter } from "./routes/products.js";

config();
const PORT = process.env.PORT || 8000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Application app and running");
});

app.all("*", () => {
  throw new CustomError(404, "Not found");
});

app.use(errorHandler);

const start = async () => {
  connectDB();
  server.listen(PORT, () => {
    console.log("Listening on port 8000");
  });
};

start();
