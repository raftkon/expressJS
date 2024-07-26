import express from "express";
import cors from "cors";
import "express-async-errors";
import compression from "compression";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { config } from "dotenv";
import { createServer } from "http";

import { authRouter } from "./routes/users.js";
import { NotFoundError } from "./errors/not-found-error.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { DatabaseConnectionError } from "./errors/database-connection-error.js";

config();
const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(
  cookieSession({
    // signed: false,
    secret: process.env.COOKIE_SECRET,
    name: "session",
  })
);

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("ok");
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log({ errorInDBConnection: error });
    throw new DatabaseConnectionError();
  }
  httpServer.listen(PORT, () => {
    console.log("Listening on port 8000");
  });
};

start();
