import express from "express";
import cors from "cors";
import morgan from "morgan";
import exampleMiddleware from "./exampleMiddleware";
import setCache from "./setCache";

const globalMiddlewares = (app: any, dir: string) => {
  app.use(express.static("./public"));
  // TODO: learn about this
  app.use(express.urlencoded({ extended: false }));
  app.use(exampleMiddleware);
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(setCache);
};

export default globalMiddlewares;
