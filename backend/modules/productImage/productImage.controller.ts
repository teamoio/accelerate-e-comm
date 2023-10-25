import { Product } from "../../entities/product";
import { AppDataSource } from "../../database/dbConnect";
import { ProductImage } from "../../entities/productImage";

const productRepo = AppDataSource.getRepository(Product);
const productImageRepo = AppDataSource.getRepository(ProductImage);

export const createProductImage = async (req: any, res: any) => {
  try {
    const { product, imageUrl } = req.body;

    const foundProduct = await productRepo.findOne({
      where: { id: product },
    });
    if (!foundProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    if (!product || !imageUrl) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary product image details.",
      });
    }
    const productImage: ProductImage = new ProductImage();
    productImage.product = product;
    productImage.imageUrl = imageUrl;

    const result = await productImageRepo.save(productImage);
    return res.status(200).json({
      message: "Product image created successfully!",
      productImage: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Product image creation failed!",
      error: error,
    });
  }
};

export const getProductImages = async (req: any, res: any) => {
  try {
    const productImages = await productImageRepo.find({
      relations: ["product"],
    });

    if (!productImages || productImages.length === 0) {
      return res.status(404).json({
        message: "Product images not found!",
      });
    }

    return res.status(200).json({
      message: "Product images fetched successfully!",
      productImages: productImages,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Product images fetch failed!",
      error: error,
    });
  }
};

export const getProductImageById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const productImage = await productImageRepo.findOne({
      where: { id: id },
      relations: ["product"],
    });

    if (!productImage) {
      return res.status(404).json({
        message: "Product image not found!",
      });
    }

    return res.status(200).json({
      message: "Product image fetched successfully!",
      productImage: productImage,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Product image fetch failed!",
      error: error,
    });
  }
};

export const updateProductImage = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { product, imageUrl } = req.body;

    const foundProduct = await productRepo.findOne({
      where: { id: product },
    });
    if (!foundProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    const foundProductImage = await productImageRepo.findOne({
      where: { id: id },
      relations: ["product"],
    });
    if (!foundProductImage) {
      return res.status(404).json({
        message: "Product image not found!",
      });
    } else {
      foundProductImage.product = product;
      foundProductImage.imageUrl = imageUrl;

      const result = await productImageRepo.save(foundProductImage);
      return res.status(200).json({
        message: "Product image updated successfully!",
        productImage: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Product image update failed!",
      error: error,
    });
  }
};

export const deleteProductImage = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const foundProductImage = await productImageRepo.findOne({
      where: { id: id },
      relations: ["product"],
    });
    if (!foundProductImage) {
      return res.status(404).json({
        message: "Product image not found!",
      });
    }

    await productImageRepo.remove(foundProductImage);
    return res.status(200).json({
      message: "Product image deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Product image deletion failed!",
      error: error,
    });
  }
};
