import express from "express";
import "reflect-metadata";
import globalMiddlewares from "./utils/globalMiddlewares";
import dotenv from "dotenv";
import ExampleRoutes from "./modules/example";
import dbConnect from "./database/dbConnect";
import errorHandler from "./middleware/errorHandling";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//this middleware is to used for including global things
globalMiddlewares(app);

//below middleware will apply to all the routes starting from '/api' like '/api/example'
// app.use("/api", exampleMiddleware2);

app.get("/", (req: any, res: any) => {
  res.send("Homepage");
});

//using middleware for all the routes except for '/' route
// app.use(exampleMiddleware3);

app.use("/api/example", ExampleRoutes);

app.all("*", (req: any, res: any) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
  dbConnect();
});
