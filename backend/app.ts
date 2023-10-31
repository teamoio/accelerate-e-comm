import "reflect-metadata";
import express from "express";
import globalMiddlewares from "./utils/globalMiddlewares";
import categoryRoutes from "./modules/category/category.routes";
import categoryImageRoutes from "./modules/categoryImage/categoryImage.routes";
import productRoutes from "./modules/product/product.routes";
import productImageRoutes from "./modules/productImage/productImage.routes";
import userRoutes from "./modules/user/user.routes";
import countryRoutes from "./modules/country/country.routes";
const session = require("express-session");
const passport = require("passport");
import { passportInitialize } from "./utils/passportConfig";
// import errorHandler from "./middleware/errorHandling";

const app = express();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
passportInitialize(passport);
app.use(passport.initialize());
app.use(passport.session());
globalMiddlewares(app);

app.get("/", (req: any, res: any) => {
  res.send("Welcome to the Homepage");
});
app.get("/login", (req: any, res: any) => {
  res.send("Try again");
});

app.use("/api/category", categoryRoutes);
app.use("/api/category-image", categoryImageRoutes);
app.use("/api/product", productRoutes);
app.use("/api/product-image", productImageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/country", countryRoutes);

// app.use(errorHandler);

app.all("*", (req: any, res: any) => {
  res.status(404).send("<h1>Resource not found</h1>");
});
export default app;
