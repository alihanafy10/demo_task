import cors from "cors"
import { json } from "express";

import * as middlewares from "./Src/Middleware/index.js";
import { authRouter } from "./Src/Modules/index.js";

export const routerHandler = (app) => {
  
  app.use(cors());
  app.use(json());

  //rest api
  app.use("/auth", authRouter);


  // handeling unhandled routes
  app.use("*", middlewares.unhandledRoutes);

  //error handler
  app.use(middlewares.errorHandler);
}