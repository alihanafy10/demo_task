import express from "express";
import { config } from "dotenv";
//db connection
import db_connection from "./Database/Connection.js";

//router
import { routerHandler } from "./router-handler.js";

export const main = () => {
  //handle errors in code
  process.on("uncaughtException", (error) => {
    console.log("error in code", error);
  });


  config();

  const app = express();
  const port = process.env.PORT || 3000;

routerHandler(app);

    //db connection
    db_connection();

  // handle error outside express
  process.on("unhandledRejection", (error) => {
    console.log("error", error);
  });

  const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
  );

}