import express from "express";
import path from "path";
import cors from "cors";
import { json } from "express";

import * as middlewares from "./Src/Middleware/index.js";
import { authRouter, todosRouter, uploadeRouter } from "./Src/Modules/index.js";

export const routerHandler = (app) => {
  app.use(cors());
  app.use(json());

  // REST API
  app.use("/auth", authRouter);
  app.use("/upload", uploadeRouter);
  app.use("/todo", todosRouter);
  
  // Serve static files from the "uploads" folder
  app.use("/Src/uploads", express.static(path.resolve("Src/uploads")));

  // Handling unhandled routes
  app.use("*", middlewares.unhandledRoutes);

  // Error handler
  app.use(middlewares.errorHandler);
};
