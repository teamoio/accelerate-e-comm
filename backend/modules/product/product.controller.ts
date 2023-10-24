import { Product } from "../../entities/product";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

export const createProduct = async (req: any, res: any) => {
  try {
    const { name, description, quantity, price, status, is_active, category } =
      req.body;

    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !status ||
      !is_active ||
      !category
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary product details.",
      });
    }

    const product: Product = new Product();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.price = price;
    product.status = status;
    product.is_active = is_active;

    const categoryId = category;
    const foundCategory = await categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!foundCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    } else {
      product.category = foundCategory;
      const result = await productRepo.save(product);
      return res.status(200).json({
        message: "Product created successfully!",
        product: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Product creation failed!",
      error: error,
    });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await productRepo.find({
      relations: ["category"],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found!",
      });
    } else {
      return res.status(200).json({
        message: "Products fetched successfully!",
        products: products,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Products fetch failed!",
      error: error,
    });
  }
};

export const getProductById = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const product = await productRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        message: "Product retrieved successfully!",
        product: product,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Product fetch failed!",
      error: error,
    });
  }
};

export const updateProduct = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const product = await productRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    } else {
      const {
        name,
        description,
        quantity,
        price,
        status,
        is_active,
        category,
      } = req.body;

      product.name = name;
      product.description = description;
      product.quantity = quantity;
      product.price = price;
      product.status = status;
      product.is_active = is_active;

      const categoryId = category;
      const foundCategory = await categoryRepo.findOne({
        where: { id: categoryId },
      });

      if (!foundCategory) {
        return res.status(404).json({
          message: "Category not found!",
        });
      } else {
        product.category = foundCategory;
        const result = await productRepo.save(product);
        return res.status(200).json({
          message: "Product updated successfully",
          product: result,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "Product update failed!",
      error: error,
    });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const product = await productRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    } else {
      await productRepo.remove(product);
      return res.status(200).json({
        message: "Product deleted successfully!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Product deletion failed!",
      error: error,
    });
  }
};
