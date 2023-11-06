import { CategoryImage } from "../../entities/categoryImage";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";
import { categoryImageValidatorSchema } from "./validations";
import { ValidationError } from "joi";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);
const categoryRepo = AppDataSource.getRepository(Category);

export const createCategoryImage = async (req: any, res: any) => {
  try {
    await categoryImageValidatorSchema.validateAsync(req.body);
    const { category, imageUrl } = req.body;

    const categoryExists = await categoryRepo.findOne({
      where: { id: category },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    if (!category || !imageUrl) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary category image details.",
      });
    }
    const categoryImage: CategoryImage = new CategoryImage();
    categoryImage.category = category;
    categoryImage.imageUrl = imageUrl;

    const result = await categoryImageRepo.save(categoryImage);
    return res.status(200).json({
      message: "Category image created successfully!",
      categoryImage: result,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({
      message: "Category image creation failed!",
      error: error,
    });
  }
};

export const getCategoryImages = async (req: any, res: any) => {
  try {
    const categoryImages = await categoryImageRepo.find({
      relations: ["category"],
    });

    if (!categoryImages || categoryImages.length === 0) {
      res.status(404).json({
        message: "Category images not found!",
      });
    } else {
      res.status(200).json({
        message: "Category images retrieved successfully!",
        categoryImages: categoryImages,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in retrieving category images",
      error: error,
    });
  }
};

export const getCategoryImageById = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const categoryImage = await categoryImageRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!categoryImage) {
      res.status(404).json({
        message: "Category image not found!",
      });
    } else {
      res.status(200).json({
        message: "Category image retrieved successfully!",
        categoryImage: categoryImage,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in retrieving category image",
      error: error,
    });
  }
};

export const updateCategoryImage = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    await categoryImageValidatorSchema.validateAsync(req.body);
    const categoryImage = await categoryImageRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!categoryImage) {
      return res.status(404).json({
        message: "Category image not found for the provided ID.",
      });
    }

    const { imageUrl, category } = req.body;

    if (!imageUrl || !category) {
      return res.status(400).json({
        message:
          "Both imageUrl and categoryId are required for updating the category image.",
      });
    }

    const categoryExists = await categoryRepo.findOne({
      where: { id: category },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found for the provided categoryId.",
      });
    }

    categoryImage.imageUrl = imageUrl;
    categoryImage.category = category;

    const updatedCategoryImage = await categoryImageRepo.save(categoryImage);

    res.status(200).json({
      message: "Category image updated successfully!",
      categoryImage: updatedCategoryImage,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({
      message: "Error in updating category image.",
      error: error,
    });
  }
};

export const deleteCategoryImage = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const categoryImage = await categoryImageRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!categoryImage) {
      return res.status(404).json({
        message: "Category image not found for the provided ID.",
      });
    }

    await categoryImageRepo.remove(categoryImage);

    res.status(200).json({
      message: "Category image deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting category image.",
      error: error,
    });
  }
};
