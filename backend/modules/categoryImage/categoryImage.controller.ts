import { CategoryImage } from "../../entities/categoryImage";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);
const categoryRepo = AppDataSource.getRepository(Category);

export const createCategoryImage = async (req: any, res: any) => {
  const categoryImage: CategoryImage = new CategoryImage();

  categoryImage.imageUrl = req.body.imageUrl;
  const categoryId = req.body.categoryId;

  const categoryExists = await categoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    res.status(404).json({
      message: "Category not found!",
    });
  } else {
    categoryImage.category = categoryExists;
    await categoryImageRepo
      .save(categoryImage)
      .then((result) => {
        res.status(200).json({
          message: "Category image created successfully!",
          categoryImage: result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Category image creation failed!",
          error: error,
        });
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
    const categoryImage = await categoryImageRepo.findOne({
      where: { id: id },
      relations: ["category"],
    });

    if (!categoryImage) {
      return res.status(404).json({
        message: "Category image not found for the provided ID.",
      });
    }

    const { imageUrl, categoryId } = req.body;

    if (!imageUrl || !categoryId) {
      return res.status(400).json({
        message:
          "Both imageUrl and categoryId are required for updating the category image.",
      });
    }

    const categoryExists = await categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found for the provided categoryId.",
      });
    }

    categoryImage.imageUrl = imageUrl;
    categoryImage.category = categoryExists;

    const updatedCategoryImage = await categoryImageRepo.save(categoryImage);

    res.status(200).json({
      message: "Category image updated successfully!",
      categoryImage: updatedCategoryImage,
    });
  } catch (error) {
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
