import { User } from "../../entities/user";
import { AppDataSource } from "../../database/dbConnect";
const bcrypt = require("bcrypt");

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password, status, is_admin } = req.body;

    if (!name || !email || !password || !status || !is_admin) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary user details.",
      });
    }

    const existingUser = await userRepo.findOne({
      where: [{ email: email }, { name: name }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "User with this email already exists.",
        });
      } else {
        return res.status(400).json({
          message: "User with this name already exists.",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.status = status;
    user.is_admin = is_admin;

    const result = await userRepo.save(user);
    return res.status(200).json({
      message: "User created successfully!",
      user: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "User creation failed!",
      error: error,
    });
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await userRepo.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found!",
      });
    } else {
      return res.status(200).json({
        message: "Users fetched successfully!",
        users: users,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Users fetch failed!",
      error: error,
    });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      return res.status(200).json({
        message: "User fetched successfully!",
        user: user,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User fetch failed!",
      error: error,
    });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      const { name, email, password, status, is_admin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.status = status;
      user.is_admin = is_admin;

      const result = await userRepo.save(user);
      return res.status(200).json({
        message: "User updated successfully!",
        user: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User update failed!",
      error: error,
    });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      const result = await userRepo.remove(user);
      return res.status(200).json({
        message: "User deleted successfully!",
        user: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User deletion failed!",
      error: error,
    });
  }
};
