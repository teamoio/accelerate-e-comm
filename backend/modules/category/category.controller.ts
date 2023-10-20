import { Category } from "../../entities/category";
import { AppDataSource } from "../../database/dbConnect";

const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (req: any, res: any) => {
  const category: Category = new Category();
  category.name = req.body.name;
  category.description = req.body.description;
  category.is_active = req.body.is_active;
  await categoryRepo
    .save(category)
    .then((result) => {
      res.status(200).json({
        message: "Category created successfully!",
        category: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Category created failed!",
        error: error,
      });
    });
};

export const getAllCategories = async (req: any, res: any) => {
  await categoryRepo
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Categories fetched successfully!",
        categories: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Categories fetched failed!",
        error: error,
      });
    });
};

export const getCategoryById = async (req: any, res: any) => {
  const categoryId = req.params.id;

  await categoryRepo
    .findOneBy({
      id: categoryId,
    })
    .then((category) => {
      if (!category) {
        res.status(404).json({
          message: "Category not found!",
        });
      } else {
        res.status(200).json({
          message: "Category fetched successfully!",
          category: category,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: "Category fetched failed!",
        error: error.message,
      });
    });
};

export const updateCategory = async (req: any, res: any) => {
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = {
      name: req.body.name,
      description: req.body.description,
      is_active: req.body.is_active,
    };

    let categoryToUpdate = await categoryRepo.findOneBy({ id: categoryId });

    if (!categoryToUpdate) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    categoryToUpdate = { ...categoryToUpdate, ...updatedCategoryData };

    const updatedCategory = await categoryRepo.save(categoryToUpdate);

    res.status(200).json({
      message: "Category updated successfully!",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Category update failed!",
      error: error,
    });
  }
};

export const deleteCategory = async (req: any, res: any) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryRepo.findOneBy({ id: categoryId });
    const deleteResult = await categoryRepo.delete(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully!",
      category: deleteResult,
    });
  } catch (error) {
    res.status(400).json({
      message: "Category deletion failed!",
      error: error,
    });
  }
};
